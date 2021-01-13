import copy
import numbers

from rest_framework import serializers
from drf_writable_nested.serializers import NestedUpdateMixin, NestedCreateMixin
from drf_writable_nested import UniqueFieldsMixin

from . import models
from . import validators

# What is a serializer?
# They allows complex data such as querysets and model instances to
# be converted to native python datatypes. From there, the data can be
# easily rendered into JSON, XML, etc. to suit our needs


class LinkSerializer(serializers.ModelSerializer):
    # class LinkSerializer(UniqueFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = models.Link
        fields = ['id', 'icon', 'address', 'title', 'index']
        # extra_kwargs = {
        #     'id': {'validators': []},
        # }

    # def update(self, instance, validated_data):
    #     print(validated_data)
    #     return instance

    # def delete_unused_images(self, owner):
    #     user_images = models.Image.objects.filter(owner=owner)
    #     for user_image in user_images:
    #         image_id = user_image.id
    #         image_is_for_deletion = True
    #         try:
    #             models.ImageSection.objects.get(image_id=image_id)
    #             image_is_for_deletion = False
    #         except models.ImageSection.DoesNotExist:
    #             pass
    #         try:
    #             models.ImageTextSection.objects.get(image_id=image_id)
    #         except models.ImageTextSection.DoesNotExist:
    #             pass
    #         if image_is_for_deletion:
    #             user_image.delete()


# class PageLinkSerializer(serializers.ListSerializer):
#     link = LinkSerializer()

#     class Meta:
#         model = models.PageLink
#         fields = ['page', 'link']

#     def update(self, instance, validated_data):
#         link_mapping = {page_link.link.id: page_link for page_link in instance}
#         return LinkAssociationUpdate(self.child, validated_data, link_mapping)


# class SectionLinkSerializer(serializers.ListSerializer):


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

#     def update(self, instance, validated_data):
#         link_mapping = {page_link.link.id: page_link for page_link in instance}
#         return LinkAssociationUpdate(self.child, validated_data, link_mapping)


# class PortfolioLinkSerializer(serializers.ListSerializer):
#     link = LinkSerializer()

#     class Meta:
#         model = models.PortfolioLink
#         fields = ['portfolio', 'link']

#     def update(self, instance, validated_data):
#         link_mapping = {portfolio_link.link.id: portfolio_link for portfolio_link in instance}
#         return LinkAssociationUpdate(self.child, validated_data, link_mapping)

# def LinkAssociationUpdate(child_serializer, validated_data, instance_mapping):
#     ret = []
#     for data in validated_data:
#         this_link = data['link']
#         this_id = this_link['id']
#         existing_link = instance_mapping.get(this_id, None)
#         if existing_link is None:
#             ret.append(child_serializer.create(data))
#         else:
#             ret.append(child_serializer.update(existing_link, data))

#     # Perform deletions
#     updated_ids = [x.link.id for x in ret]
#     for link_id, link in instance_mapping.items():
#         if link_id not in updated_ids:
#             link.link.delete()
#             link.delete()
#     return ret


# class PageLinkDetailSerializer(serializers.ModelSerializer):
#     link = LinkSerializer()

#     class Meta:
#         list_serializer_class = PageLinkSerializer
#         model = models.PageLink
#         fields = ['page', 'link']

#     def create(self, validated_data):
#         # Store the data for the link seperately
#         owner = validated_data.pop('owner')
#         links_data = validated_data.pop('link')
#         if links_data:
#             link = models.Link.objects.create(owner=owner, **links_data)
#         # Create a new PageLink model that connects to the
#         # newly created Link model
#         page_link = models.PageLink.objects.create(
#             link=link,
#             **validated_data
#         )
#         # Return the nested JSON data
#         return page_link

#     def update(self, instance, validated_data):
#         return association_link_detail_update(instance, validated_data)


# class SectionLinkDetailSerializer(serializers.ModelSerializer):
#     link = LinkSerializer()

#     class Meta:
#         list_serializer_class = SectionLinkSerializer
#         model = models.SectionLink
#         fields = ['section', 'link']

#     def create(self, validated_data):
#         owner = validated_data.pop('owner')
#         links_data = validated_data.pop('link')

#         if links_data:
#             link = models.Link.objects.create(owner=owner, **links_data)

#         section_link = models.SectionLink.objects.create(
#             link=link,
#             **validated_data
#         )

#         return section_link

#     def update(self, instance, validated_data):
#         return association_link_detail_update(instance, validated_data)


# class PortfolioLinkDetailSerializer(serializers.ModelSerializer):
#     link = LinkSerializer()

#     class Meta:
#         list_serializer_class = PortfolioLinkSerializer
#         model = models.PortfolioLink
#         fields = ['portfolio', 'link']

#     def create(self, validated_data):
#         owner = validated_data.pop('owner')
#         links_data = validated_data.pop('link')

#         if links_data:
#             link = models.Link.objects.create(owner=owner, **links_data)

#         portfolio_link = models.PortfolioLink.objects.create(
#             link=link,
#             **validated_data
#         )

#         return portfolio_link

#     def update(self, instance, validated_data):
#         return association_link_detail_update(instance, validated_data)


# def association_link_detail_update(instance, validated_data):
#     new_link = validated_data.pop('link')
#     for key, value in new_link.items():
#         setattr(instance.link, key, value)

#     instance.link.save()
#     return instance


class ImageInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ['id', 'name', 'path']


class ImageOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ['id', 'owner', 'name', 'path']


# def sectionListUpdate(child_serializer, validated_data, section_mapping, ):
#     # Perform creations and updates.
#     ret = []
#     for data in validated_data:
#         section = section_mapping.get(data.pop('id', None), None)
#         if section is None:
#             ret.append(child_serializer.create(data))
#         else:
#             ret.append(child_serializer.update(section, data))

#     # Perform deletions.
#     for section_id, section in section_mapping.items():
#         if section_id not in map(lambda s: s.id, ret):
#             section.delete()

#     return ret


# class SectionSerializer(serializers.ModelSerializer):
class SectionSerializer(
    UniqueFieldsMixin,
    NestedCreateMixin,
    NestedUpdateMixin,
    serializers.ModelSerializer
):
    links = SectionLinkSerializer(many=True)
    page = serializers.ReadOnlyField(source='page.id')

    # links = SectionLinkDetailSerializer(many=True)

    # add id explicitly for it to be avaliable in the list serialiser
    # id = serializers.IntegerField(required=False)

    class Meta:
        model = models.Section
        fields = ['id', 'name', 'type', 'index', 'text', 'page', 'links']
        # extra_kwargs = {
        #     # don't need to show the page as that can be inferred from the url
        #     'page': {'write_only': True},
        # }

    # def validate_page(self, value):
    #     # make sure the new page is owned by the user
    #     owner = value.owner
    #     if self.context['request'].user != owner:
    #         raise serializers.ValidationError('You do not own this page')
    #     return value

    # def to_internal_value(self, data: dict):
    #     if 'page' not in data:
    #         data['page'] = self.context['page']

    #     return data

# class SectionListSerializer(serializers.ListSerializer):

#     def __init__(self, *args, **kwargs):
#         self.child = kwargs.pop('child', copy.deepcopy(self.child))
#         self.allow_empty = kwargs.pop('allow_empty', True)
#         super(serializers.ListSerializer, self).__init__(*args, **kwargs)

#     def create(self, validated_data):
#         ret = []
#         for i, attrs in enumerate(validated_data):
#             ret.append(self.child.create(attrs))
#         return ret

#     # based on example from docs
#     # https://www.django-rest-framework.org/api-guide/serializers/#listserializer
#     def update(self, instance, validated_data):
#         # Maps for id->instance and id->data item.
#         section_mapping = {section.id: section for section in instance}

#         return sectionListUpdate(self.child, section_mapping, validated_data)


class PageListInputSerializer(serializers.ListSerializer):
    sections = SectionSerializer(many=True)

    class Meta:
        model = models.Page
        fields = ['id', 'name', 'index']

    # def update(self, instance, validated_data):
    #     number = validated_data.pop('number', None)

    #     super().update(instance, validated_data)

    #     # !!! Up to, haven't tried page list update yet

    #     page_mapping = {page.id: page for page in instance}
    #     return sectionListUpdate(self.child, page_mapping, validated_data)

    #     # return instance


# class PageInputSerializer(serializers.ModelSerializer):
#     # class PageInputSerializer(WritableNestedModelSerializer):
#     # sections = SectionSerializer(many=True)

#     class Meta:
#         model = models.Page
#         fields = ['id', 'name', 'index']
# class PageOutputSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Page
#         fields = ['id', 'name', 'index']

# class PageSerializer(serializers.ModelSerializer):
# class PageSerializer(WritableNestedModelSerializer):
class PageSerializer(NestedCreateMixin, NestedUpdateMixin, serializers.ModelSerializer):
    sections = SectionSerializer(many=True)

    class Meta:
        model = models.Page
        fields = ['id', 'name', 'index', 'sections']

# class PortfolioInputSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Portfolio
#         fields = ['id', 'name', 'private', 'theme', 'background']


class PortfolioSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')
    pages = PageSerializer(read_only=True, many=True)

    class Meta:
        model = models.Portfolio
        fields = ['id', 'owner', 'name', 'pages',
                  'private', 'theme', 'background']

class ImageSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = models.Image
        fields = ['id', 'owner', 'name', 'path']