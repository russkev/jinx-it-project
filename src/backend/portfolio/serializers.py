from rest_framework import serializers
from drf_writable_nested.serializers import (
    NestedUpdateMixin, 
    NestedCreateMixin,
    WritableNestedModelSerializer
)
from drf_writable_nested import UniqueFieldsMixin

from . import models

# What is a serializer?
# They allows complex data such as querysets and model instances to
# be converted to native python datatypes. From there, the data can be
# easily rendered into JSON, XML, etc. to suit our needs

################################################################################
# LINK
################################################################################
# class LinkSerializer(
#     UniqueFieldsMixin,
#     serializers.ModelSerializer
# ):
#     class Meta:
#         model = models.Link
#         fields = ['id', 'icon', 'address', 'title', 'index']


class SectionLinkSerializer(
    UniqueFieldsMixin,
    serializers.ModelSerializer
):
    # link = LinkSerializer()
    section = serializers.ReadOnlyField(source='section.id')

    class Meta:
        model = models.SectionLink
        # fields = ['section', 'link']
        fields = ['id', 'name', 'icon', 'address', 'index', 'section']


class PortfolioLinkSerializer(
    UniqueFieldsMixin,
    serializers.ModelSerializer
):
    # link = LinkSerializer()
    portfolio = serializers.ReadOnlyField(source='portfolio.id')

    class Meta:
        model = models.PortfolioLink
        # fields = ['section', 'link']
        fields = ['id', 'name', 'icon', 'address', 'index', 'portfolio']

    # # def update(self, instance, validated_data):
    # def create(self, validated_data):
    #     print(validated_data)
    #     # print("updating")
    #     instance = models.SectionLink.objects.filter(section = validated_data['section'])
    #     link_mapping = {section_link.link.id: section_link for section_link in instance}
    #     # print(temp)
    #     # link_mapping = {section_link.get().link.id: section_link for section_link in instance}
    #     print(link_mapping)
    #     ret = []
    #     # for data in validated_data:
    #     this_link = validated_data['link']
    #     this_id = this_link['id']
    #     existing_link = link_mapping.get(this_id, None)
    #     if existing_link is None:
    #         ret.append(LinkSerializer.create(LinkSerializer, validated_data))
    #     else:
    #         ret.append(LinkSerializer.update(LinkSerializer, existing_link, validated_data))
        
    #     updated_ids = [x.link.id for x in ret]
    #     for link_id, link in link_mapping.items():
    #         if link_id not in updated_ids:
    #             link.link.delete()
    #             link.delete()
    #     return ret


# class PortfolioLinkSerializer(
#     UniqueFieldsMixin,
#     NestedCreateMixin,
#     NestedUpdateMixin,
#     serializers.ModelSerializer
# ):
#     link = LinkSerializer()
#     portfolio = serializers.ReadOnlyField(source='portfolio.id')

#     class Meta:
#         model = models.PortfolioLink
#         fields = ['portfolio', 'link']

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
