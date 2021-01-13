from rest_framework import serializers
from drf_writable_nested.serializers import NestedUpdateMixin, NestedCreateMixin
from drf_writable_nested import UniqueFieldsMixin

from . import models

# What is a serializer?
# They allows complex data such as querysets and model instances to
# be converted to native python datatypes. From there, the data can be
# easily rendered into JSON, XML, etc. to suit our needs

################################################################################
# LINK
################################################################################
class LinkSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = models.Link
        fields = ['id', 'icon', 'address', 'title', 'index']


class SectionLinkSerializer(
    NestedCreateMixin,
    NestedUpdateMixin,
    serializers.ModelSerializer
):
    link = LinkSerializer()
    section = serializers.ReadOnlyField(source='section.id')

    class Meta:
        model = models.SectionLink
        fields = ['section', 'link']


class PortfolioLinkSerializer(
    NestedCreateMixin,
    NestedUpdateMixin,
    serializers.ModelSerializer
):
    link = LinkSerializer()
    portfolio = serializers.ReadOnlyField(source='portfolio.id')

    class Meta:
        model = models.PortfolioLink
        fields = ['portfolio', 'link']

################################################################################
# SECTION
################################################################################
class SectionSerializer(
    UniqueFieldsMixin,
    NestedCreateMixin,
    NestedUpdateMixin,
    serializers.ModelSerializer
):
    links = SectionLinkSerializer(many=True)
    page = serializers.ReadOnlyField(source='page.id')

    class Meta:
        model = models.Section
        fields = ['id', 'name', 'type', 'index', 'text', 'page', 'links']


################################################################################
# PAGE
################################################################################
class PageSerializer(
    NestedCreateMixin, 
    NestedUpdateMixin, 
    serializers.ModelSerializer
):
    sections = SectionSerializer(many=True)

    class Meta:
        model = models.Page
        fields = ['id', 'name', 'index', 'sections']

################################################################################
# PORTFOLIO
################################################################################
class PortfolioSerializer(
    serializers.ModelSerializer
):
    owner = serializers.ReadOnlyField(source='owner.id')
    pages = PageSerializer(read_only=True, many=True)

    class Meta:
        model = models.Portfolio
        fields = ['id', 'owner', 'name', 'pages',
                  'private', 'theme', 'background']

################################################################################
# IMAGE
################################################################################
class ImageSerializer(
    serializers.ModelSerializer
):
    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = models.Image
        fields = ['id', 'owner', 'name', 'path']
