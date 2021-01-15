from rest_framework import generics
from rest_framework import permissions
from rest_framework import serializers as drf_serializers
from rest_framework.parsers import MultiPartParser, FormParser

from django.db.models import Q

from common.permissions import IsReadOnly

from . import models
from . import serializers
from . import swagger

from .permissions import IsOwner, IsNotPrivate

################################################################################
# IMAGE
################################################################################

class ImageDetail(generics.RetrieveUpdateDestroyAPIView):
    # These parses required for receiving over image data
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = serializers.ImageSerializer
    queryset = models.Image.objects.all()
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]
    lookup_url_kwarg = 'image_id'
    swagger_schema = swagger.PortfolioAutoSchema

    def get_queryset(self):
        return models.Image.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ImageList(generics.ListCreateAPIView):
    serializer_class = serializers.ImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]
    swagger_schema = swagger.PortfolioAutoSchema

    def get_queryset(self):
        return models.Image.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

################################################################################
# LINK
################################################################################

class PortfolioLinkList(generics.ListCreateAPIView):
    serializer_class = serializers.PortfolioLinkSerializer
    permission_class = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.PortfolioLink.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema

    def perform_create(self, serializer):
        portfolio = models.Portfolio.objects.get(
            id=self.kwargs['portfolio_id']
        )
        serializer.save(portfolio=portfolio)


class PortfolioLinkDetail(generics.DestroyAPIView):
    serializer_class = serializers.PortfolioLinkSerializer
    lookup_url_kwarg = 'link_id'
    permission_class = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.PortfolioLink.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema

    def perform_destroy(self, instance):
        link_id = self.kwargs['link_id']
        models.PortfolioLink.objects.filter(link=link_id).delete()
        models.Link.objects.get(id=link_id).delete()


class SectionLinkList(generics.ListCreateAPIView):
    serializer_class = serializers.SectionLinkSerializer
    permission_class = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.SectionLink.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema

    def perform_create(self, serializer):
        section = models.Section.objects.get(
            id=self.kwargs['section_id']
        )
        serializer.save(section=section)


class SectionLinkDetail(generics.DestroyAPIView):
    serializer_class = serializers.SectionLinkSerializer
    lookup_url_kwarg = 'link_id'
    permission_class = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.SectionLink.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema

    def perform_destroy(self, instance):
        link_id = self.kwargs['link_id']
        models.SectionLink.objects.filter(link=link_id).delete()
        models.Link.objects.filter(id=link_id).delete()


class LinkDetail(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.LinkSerializer
    lookup_url_kwarg = 'link_id'
    permission_class = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.Link.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema


################################################################################
# SECTION
################################################################################

class SectionList(generics.ListCreateAPIView):
    serializer_class = serializers.SectionSerializer
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.Section.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema

    def perform_create(self, serializer):
        page = models.Page.objects.get(
            id=self.kwargs['page_id']
        )
        serializer.save(page = page)


class SectionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.SectionSerializer
    lookup_url_kwarg = 'section_id'
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.Section.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema


################################################################################
# PAGE
################################################################################

class PageList(generics.ListCreateAPIView):
    serializer_class = serializers.PageSerializer
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.Page.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema

    def perform_create(self, serializer):
        portfolio = models.Portfolio.objects.get(
            id=self.kwargs['portfolio_id']
        )
        serializer.save(portfolio = portfolio)


class PageDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PageSerializer
    lookup_url_kwarg = 'page_id'
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.Page.objects.all()
    swagger_schema = swagger.PortfolioAutoSchema

################################################################################
# PORTFOLIO
################################################################################

class PortfolioList(generics.ListCreateAPIView):
    serializer_class = serializers.PortfolioSerializer
    # allow anyone to see the list of portfolios, 
    # but only authenticated users can add portfolios
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    swagger_schema = swagger.PortfolioAutoSchema

    # Anyone can get the list of portfolios, but private portfolios will only
    # be visible for the owner.
    # It's a function as we want it to be called on each request.
    # If it was a variable, it would only be set one time and won't change
    # depending on current user.
    def get_queryset(self):
        # Q to perform OR operation
        # https://docs.djangoproject.com/en/3.1/topics/db/queries/#complex-lookups-with-q-objects
        owner = self.request.user
        filter_query = Q(private=False)
        if owner.is_authenticated:
            filter_query = filter_query | Q(owner=owner)

        return models.Portfolio.objects.filter(filter_query)

    # when creating a portfolio, autoset the owner to be current user
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PortfolioSerializer
    # the owner always has full permissions
    # everyone else only has read permissions if the portfolio is public
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]
    queryset = models.Portfolio.objects.all()
    # key to use in url configuration
    lookup_url_kwarg = 'portfolio_id'
    swagger_schema = swagger.PortfolioAutoSchema