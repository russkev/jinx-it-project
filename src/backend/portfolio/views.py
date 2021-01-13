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

class ImageDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ImageSerializer
    # These parses required for receiving over image data
    parser_classes = (MultiPartParser, FormParser)
    queryset = models.Image.objects.all()
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]


    # def get_serializer_class(self):
    #     # Allows this url to handle GET and POST with different serializers
    #     if self.request.method in ['PUT', 'PATCH']:
    #         return serializers.ImageInputSerializer
    #     return serializers.ImageOutputSerializer

    lookup_url_kwarg = 'image_id'

    # def get_queryset(self):
    #     return models.Image.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ImageList(generics.ListCreateAPIView):
    serializer_class = serializers.ImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    # def get_serializer_class(self):
    #     # Allows this url to handle GET and POST with different serializers
    #     if self.request.method in ['POST']:
    #         return serializers.ImageInputSerializer
    #     return serializers.ImageOutputSerializer

    # def get_queryset(self):
    #     owner = self.request.user
    #     filter_query = Q(private=False)
    #     if owner.is_authenticated:
    #         filter_query = filter_query | Q(owner=owner)

    #     return models.Image.objects.filter(filter_query)

    def get_queryset(self):
        return models.Image.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]


    def perform_destroy(self, instance):
        parent_id = instance.page
        # pylint: disable=no-member
        super().perform_destroy(instance)
        models.Section.objects.normalise(parent_id)


# class PortfolioLinkList(generics.ListCreateAPIView):
#     serializer_class = serializers.LinkSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def get_queryset(self):
#         try:
#             portfolio_id = self.kwargs['portfolio_id']
#             portfolio = models.Portfolio.objects.get(
#                 id=portfolio_id)
#         except (models.Portfolio.DoesNotExist) as exc:
#             raise Http404 from exc

#         return models.PortfolioLink.objects.filter(portfolio=portfolio)

#     def get(self, request, *args, **kwargs):
#         links = self.get_queryset()
#         portfolio = kwargs['portfolio_id']

#         # Serialize them into a string
#         serializer = serializers.PortfolioLinkSerializer(
#             links,
#             child=serializers.PortfolioLinkDetailSerializer(),
#         )
#         # Return the JSON string
#         return Response(serializer.data)

#     def set_serializer(self, data_list):
#         return serializers.PortfolioLinkSerializer(
#             self.get_queryset(),
#             data=data_list,
#             child=serializers.PortfolioLinkDetailSerializer(),
#         )

#     def get_keywords(self):
#         return "portfolio", "portfolio_id"

#     def put(self, request, *args, **kwargs):
#         return link_association_put(self, request, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return link_association_put(self, request, **kwargs)

# class PageLinkList(generics.ListCreateAPIView):
#     serializer_class = serializers.LinkSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def get_queryset(self):
#         try:
#             portfolio_id = self.kwargs['portfolio_id']
#             page = self.kwargs['page_id']
#             portfolio = models.Portfolio.objects.get(
#                 id=portfolio_id)
#             page = portfolio.pages.get(id=page)
#         except (models.Portfolio.DoesNotExist, models.Page.DoesNotExist) as exc:
#             raise Http404 from exc

#         return models.PageLink.objects.filter(page=page)

#     def get(self, request, *args, **kwargs):
#         links = self.get_queryset()
#         page = kwargs['page_id']

#         # Serialize them into a string
#         serializer = serializers.PageLinkSerializer(
#             links,
#             child=serializers.PageLinkDetailSerializer(),
#         )
#         # Return the JSON string
#         return Response(serializer.data)

#     def set_serializer(self, data_list):
#         return serializers.PageLinkSerializer(
#             self.get_queryset(),
#             data=data_list,
#             child=serializers.PageLinkDetailSerializer(),
#         )

#     def get_keywords(self):
#         return "page", "page_id"
        
#     def put(self, request, *args, **kwargs):
#         return link_association_put(self, request, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return link_association_put(self, request, **kwargs)






    # def get_queryset(self):
    #     try:
    #         portfolio_id = self.kwargs['portfolio_id']
    #         page = self.kwargs['page_id']
    #         section = self.kwargs['section_id']
    #         portfolio = models.Portfolio.objects.get(
    #             id=portfolio_id)
    #         page = portfolio.pages.get(id=page)
    #         section = page.sections.get(id=section)
    #     except (models.Portfolio.DoesNotExist, models.Page.DoesNotExist) as exc:
    #         raise Http404 from exc

    #     return models.SectionLink.objects.filter(section=section)
    
    # def get(self, request, *args, **kwargs):
    #     links = self.get_queryset()
    #     section = kwargs['section_id']

    #     # Serialize them into a string
    #     serializer = serializers.SectionLinkSerializer(
    #         links,
    #         child=serializers.SectionLinkDetailSerializer(),
    #     )
    #     # Return the JSON string
    #     return Response(serializer.data)

    # def set_serializer(self, data_list):
    #     return serializers.SectionLinkSerializer(
    #         self.get_queryset(),
    #         data=data_list,
    #         child=serializers.SectionLinkDetailSerializer(),
    #     )

    # def get_keywords(self):
    #     return "section", "section_id"

    # def put(self, request, *args, **kwargs):
    #     return link_association_put(self, request, **kwargs)

    # def post(self, request, *args, **kwargs):
    #     return link_association_put(self, request, **kwargs)


# def link_association_put(view, request, **kwargs):

#     data_list = []
#     assoc_name, assoc_id_name = view.get_keywords()
#     for single_request in request.data:
#         data_list.append(
#             {assoc_name: kwargs[assoc_id_name], "link": single_request})

#     serializer = view.set_serializer(data_list)

#     if(serializer.is_valid()):
#         serializer.save(owner=view.request.user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

################################################################################
# LINK
################################################################################

class PortfolioLinkList(generics.ListCreateAPIView):
    serializer_class = serializers.PortfolioLinkSerializer
    permission_class = [(IsNotPrivate & IsReadOnly) | IsOwner]

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

    def perform_destroy(self, instance):
        link_id = self.kwargs['link_id']
        models.PortfolioLink.objects.filter(link=link_id).delete()
        models.Link.objects.get(id=link_id).delete()


class SectionLinkList(generics.ListCreateAPIView):
    serializer_class = serializers.SectionLinkSerializer
    permission_class = [(IsNotPrivate & IsReadOnly) | IsOwner]

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

    def perform_create(self, serializer):
        page = models.Page.objects.get(
            id=self.kwargs['page_id']
        )
        serializer.save(page = page)

    swagger_schema = swagger.PortfolioAutoSchema


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


    # allow anyone to see the list of portfolios, but only authenticated users can add portfolios
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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

    swagger_schema = swagger.PortfolioAutoSchema


class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PortfolioSerializer

    # key to use in url configuration
    lookup_url_kwarg = 'portfolio_id'

    # the owner always has full permissions
    # everyone else only has read permissions if the portfolio is public
    permission_classes = [(IsNotPrivate & IsReadOnly) | IsOwner]

    queryset = models.Portfolio.objects.all()

    swagger_schema = swagger.PortfolioAutoSchema
