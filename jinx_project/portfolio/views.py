from django.shortcuts import render
from django.http import Http404
from django.db import transaction
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from . import models
from . import serializers
from . import swagger

from .permissions import IsOwner


class PortfolioList(generics.ListCreateAPIView):
    def get_serializer_class(self):
        # Allows this url to handle GET and POST with different serializers
        if self.request.method in ['POST']:
            return serializers.PortfolioInputSerializer
        return serializers.PortfolioOutputSerializer

    # only allow signed in users to see their portfolios
    permission_classes = [permissions.IsAuthenticated]

    # Only show the portfolios that a user owns.
    # It's a function as we want it to be called on each request.
    # If it was a variable, it would only be set one time and won't change
    # depending on current user.
    def get_queryset(self):
        return models.Portfolio.objects.filter(owner=self.request.user)

    # when creating a portfolio, autoset the owner to be current user
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    swagger_schema = swagger.PortfolioAutoSchema


class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.PortfolioInputSerializer
        return serializers.PortfolioOutputSerializer

    # key to use in url configuration
    lookup_url_kwarg = 'portfolio_id'

    # only allow the owner of a portfolio to see it
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    queryset = models.Portfolio.objects.all()

    swagger_schema = swagger.PortfolioAutoSchema


class PageList(generics.ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method in ['POST']:
            return serializers.PageInputSerializer
        return serializers.PageOutputSerializer

    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Page.objects.filter(
            portfolio__owner=self.request.user,
            portfolio=self.kwargs['portfolio_id']
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['portfolio_id'] = self.kwargs['portfolio_id']
        return context

    swagger_schema = swagger.PortfolioAutoSchema


class PageDetail(generics.RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.PageInputSerializer
        return serializers.PageOutputSerializer

    lookup_url_kwarg = 'page_id'
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = models.Page.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['portfolio_id'] = self.kwargs['portfolio_id']
        return context

    def perform_destroy(self, instance):
        parent_id = instance.portfolio
        # really missing haskell's type system now :(
        # pylint can't figure out that the superclass has the perform_destroy method
        # pylint: disable=no-member
        super().perform_destroy(instance)
        models.Page.objects.normalise(parent_id)


class SectionList(generics.ListCreateAPIView):
    serializer_class = serializers.PolymorphSectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # double underscore is equivalent to a database join
        # https://docs.djangoproject.com/en/3.1/topics/db/queries/#lookups-that-span-relationships
        filter_param = {
            'page__portfolio__owner': self.request.user,
            'page__portfolio': self.kwargs['portfolio_id'],
            'page': self.kwargs['page_id'],
        }
        text_sections = models.TextSection.objects.filter(**filter_param)
        image_sections = models.ImageSection.objects.filter(**filter_param)
        image_text_sections = models.ImageTextSection.objects.filter(**filter_param)
        media_sections = models.MediaSection.objects.filter(**filter_param)
        return list(text_sections) + list(image_sections) + list(image_text_sections) + list(media_sections)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        # kind of redundant as context['view'] would have the kwargs but just in case
        # the urls change
        context['page_id'] = self.kwargs['page_id']
        return context

    swagger_schema = swagger.PortfolioAutoSchema

    # bulk section creation/update
    def put(self, request, *args, **kwargs):
        for i, section in enumerate(request.data):
            section['number'] = i
        context = self.get_serializer_context()
        context['in_list'] = True
        serializer = serializers.SectionListSerializer(
            self.get_queryset(),
            data=request.data,
            child=serializers.PolymorphSectionSerializer(
                context=context
            ),
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PolymorphSectionSerializer
    lookup_url_kwarg = 'section_id'
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        text_sections = models.TextSection.objects.all()
        image_sections = models.ImageSection.objects.all()
        image_text_sections = models.ImageTextSection.objects.all()
        media_sections = models.MediaSection.objects.all()
        return list(text_sections) + list(image_sections) + list(media_sections) + list(image_text_sections)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['page_id'] = self.kwargs['page_id']
        return context

    # modified based on code from GenericAPIView default implementation
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        # find the object with the right key
        key = self.lookup_field
        val = self.kwargs[lookup_url_kwarg]
        obj = None
        for item in queryset:
            if str(getattr(item, key)) == val:
                obj = item
                break
        else:
            raise Http404

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj

    swagger_schema = swagger.PortfolioAutoSchema


class ImageDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ImageInputSerializer
    # These parses required for receiving over image data
    parser_classes = (MultiPartParser, FormParser)

    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        # Allows this url to handle GET and POST with different serializers
        if self.request.method in ['PUT', 'PATCH']:
            return serializers.ImageInputSerializer
        return serializers.ImageOutputSerializer

    lookup_url_kwarg = 'image_id'

    def get_queryset(self):
        return models.Image.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ImageList(generics.ListCreateAPIView):
    serializer_class = serializers.ImageInputSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_serializer_class(self):
        # Allows this url to handle GET and POST with different serializers
        if self.request.method in ['POST']:
            return serializers.ImageInputSerializer
        return serializers.ImageOutputSerializer

    def get_queryset(self):
        return models.Image.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    permission_classes = [permissions.IsAuthenticated]
    def perform_destroy(self, instance):
        parent_id = instance.page
        # pylint: disable=no-member
        super().perform_destroy(instance)
        models.Section.objects.normalise(parent_id)
