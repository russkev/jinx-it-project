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
# IMAGE
################################################################################


class ImageSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = models.Image
        fields = ['id', 'name', 'path']


################################################################################
# SECTION LINK
################################################################################
class SectionLinkSerializer(
    UniqueFieldsMixin,
    serializers.ModelSerializer
):
    section = serializers.ReadOnlyField(source='section.id')

    class Meta:
        model = models.SectionLink
        fields = ['id', 'name', 'icon', 'address', 'index', 'section']

################################################################################
# PORTFOLIO LINK
################################################################################
class PortfolioLinkSerializer(
    UniqueFieldsMixin,
    serializers.ModelSerializer
):
    portfolio = serializers.ReadOnlyField(source='portfolio.id')

    class Meta:
        model = models.PortfolioLink
        fields = ['id', 'name', 'icon', 'address', 'index', 'portfolio']


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
        fields = ['id', 'name', 'type', 'index', 'page', 'border', 'links',
                  'text', 'image', 'video']


# class SectionOutputSerializer(
#     UniqueFieldsMixin,
#     NestedCreateMixin,
#     NestedUpdateMixin,
#     serializers.ModelSerializer
# ):
#     links = SectionLinkSerializer(many=True)
#     page = serializers.ReadOnlyField(source='page.id')
#     image = ImageSerializer(read_only=True)

#     class Meta:
#         model = models.Section
#         fields = ['id', 'name', 'type', 'index', 'page', 'links',
#                   'text', 'image', 'video']


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

    # def delete_unused_images(self, owner):
    #     user_images = models.Image.objects.filter(owner=owner)
    #     for user_image in user_images:
    #         image_id = user_image.id
    #         image_is_for_deletion = True
    #         try:
    #             models.Section.objects.get(image=image_id)
    #             image_is_for_deletion = False
    #         except models.Section.DoesNotExist:
    #             pass
    #         if image_is_for_deletion:
    #             user_image.delete()

    def update(self, instance, validated_data):
        super().update(instance, validated_data)
        # self.delete_unused_images(instance.owner)
        return instance

################################################################################
# PORTFOLIO
################################################################################
class PortfolioSerializer(
    NestedCreateMixin,
    NestedUpdateMixin,
    serializers.ModelSerializer
):
    owner = serializers.ReadOnlyField(source='owner.id')
    pages = PageSerializer(read_only=True, many=True)
    links = PortfolioLinkSerializer(many=True)

    class Meta:
        model = models.Portfolio
        fields = ['id', 'owner', 'name', 'subtitle', 'pages', 'links',
                  'private', 'theme', 'background', 'avatar']


