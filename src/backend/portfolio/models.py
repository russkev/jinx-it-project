from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

from datetime import datetime
from django.dispatch import receiver

from account.signals import account_created

import uuid
import os
import io

from PIL import Image as pilImage

@receiver(account_created)
def create_default_portfolio(sender, **kwargs):
    account = kwargs.get('account')
    portfolio = Portfolio.objects.create(
        owner=account.user,
        name='My Portfolio',
        subtitle='A collection of works',
        theme="Arch",
    )
    PortfolioLink.objects.create(
        portfolio=portfolio,
        name='',
        icon=6,
        address='https://www.linkedin.com/',
        index=0
    )
    PortfolioLink.objects.create(
        portfolio=portfolio,
        name='',
        icon=9,
        address='https://www.instagram.com/',
        index=1,
    )
    about_me_page = Page.objects.create(
        portfolio=portfolio,
        name='About Me',
        index=0,
    )
    Section.objects.create(
        page=about_me_page,
        name='',
        index='0',
        type='text',
        text='Welcome to Jinx\'s portfolio creation software! '
        'This is a default portfolio, feel free to modify or delete.',
    )
    projects_page = Page.objects.create(
        portfolio=portfolio,
        name='Projects',
        index=1,
    )
    project_1_section = Section.objects.create(
        page=projects_page,
        name='Project 1',
        type='image_text',
        border=True,
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
        'sed do eiusmod tempor incididunt ut labore et dolore magna '
        'aliqua. Ut enim ad minim veniam, quis nostrud exercitation '
        'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis '
        'aute irure dolor in reprehenderit in voluptate velit esse '
        'cillum dolore eu fugiat nulla pariatur.',
        index=0,
    )
    SectionLink.objects.create(
        section=project_1_section,
        name='Github Repository',
        icon=6,
        address='https://github.com/',
        index=0
    )
    SectionLink.objects.create(
        section=project_1_section,
        name='Demo',
        icon=13,
        address='https://app.jinx.systems/',
        index=1,
    )
    Section.objects.create(
        page=projects_page,
        name='Project 2',
        type='image_text',
        border=True,
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
        'sed do eiusmod tempor incididunt ut labore et dolore magna '
        'aliqua. Ut enim ad minim veniam, quis nostrud exercitation '
        'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis '
        'aute irure dolor in reprehenderit in voluptate velit esse '
        'cillum dolore eu fugiat nulla pariatur.',
        index=1
    )
    contact_me_page = Page.objects.create(
        portfolio=portfolio,
        name='Contact Me',
        index=2,
    )
    Section.objects.create(
        page=contact_me_page,
        name='',
        text='email: [' + account.user.email + '](mailto:' + 
            account.user.email + ')' + '\n\n' +
            'phone: (+61) 0400 123 456 \n\n' + 
            'location: Melbourne, Australia'
    )
    account.primary_portfolio = portfolio
    account.save()



class Image(models.Model):
    #   Image upload tutorial
    #   https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)

    def image_path(self, filename):
        _now = datetime.now()
        return 'images/{user}/{year}/{month}/{day}/{file}'.format(
            user=self.owner,
            file=filename,
            year=_now.strftime('%Y'),
            month=_now.strftime('%m'),
            day=_now.strftime('%d'))

    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='images')
    name = models.CharField(max_length=100)
    path = models.ImageField(upload_to=image_path, null=True)

    def __str__(self):
        return self.name

    def save_square(self, target_length):
        file, extension = os.path.splitext(self.path.path)
        image = pilImage.open(self.path)

        length = min(image.size)
        left = (image.width - length) / 2
        top = (image.height - length) / 2
        right = (image.width + length) / 2
        bottom = (image.height + length) / 2
        image_square = image.crop((left, top, right, bottom))
        image_square.thumbnail((target_length, target_length))
        image_square.save(file + '.' + str(target_length) +
                          '_square' + extension)
    
    # Automatically resize image
    # Some useful information here:
    # https://stackoverflow.com/questions/42996150/thumbnail-for-imagefield-in-django-model-override-save
    def create_resized(self):
        if not self.path:
            return
        print(self.path)

        file, extension = os.path.splitext(self.path.path)

        # Save image max dimension: 300 pixels
        image = pilImage.open(self.path)
        image_300 = image.copy()
        image_300.thumbnail((300,300))
        image_300.save(file + '.300' + extension)

        # Save image 40 x 40 square
        self.save_square(40)
        # length = min(image.size)
        # left = (image.width - length) / 2
        # top = (image.height - length) / 2
        # right = (image.width + length) / 2
        # bottom = (image.height + length) / 2
        # image_40_square = image.crop((left, top, right, bottom))
        # image_40_square.thumbnail((40, 40))
        # image_40_square.save(file + '.40_square' + extension)

    def save(self, *args, **kwargs):
        super(Image, self).save()
        self.create_resized()

# Auto delete files from file system when not required
# For more info, see here:
# https://stackoverflow.com/questions/16041232/django-delete-filefield
@receiver(models.signals.post_delete, sender=Image)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.path:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)

@receiver(models.signals.pre_save, sender=Image)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.id:
        return False
    
    try:
        old_file = Image.objects.get(id=instance.id).path
    except Image.DoesNotExist:
        return False
    
    new_file = instance.path
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)



class Portfolio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)
    # Link portfolio to user (which is linked to account)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='portfolios')
    # Portfolio name e.g. professional, art
    name = models.CharField(max_length=100, blank=True)
    subtitle = models.CharField(max_length=100, blank=True)

    private = models.BooleanField(default=True)

    theme = models.CharField(max_length=100, null=True, blank=True)
    background = models.CharField(max_length=300, null=True, blank=True)
    profile_picture = models.ForeignKey(
        Image, null=True, on_delete=models.CASCADE, related_name='portfolios')


    def __str__(self):
        return self.name


class Page(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)

    portfolio = models.ForeignKey(
        Portfolio, on_delete=models.CASCADE, related_name='pages')
    name = models.CharField(max_length=100, blank=True)
    # page number (distinct from its id) to allow reordering of pages
    index = models.IntegerField(default=0)

    # don't add owner as a field of page as that goes againt relational db
    # normalisation principles
    @property
    def owner(self):
        return self.portfolio.owner

    @property
    def private(self):
        return self.portfolio.private

    class Meta:
        ordering = ['index']

    def __str__(self):
        return self.name


class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)

    page = models.ForeignKey(
        Page, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(blank=True, max_length=250)
    # ordering number to order sections on a page
    index = models.IntegerField(default=0)
    type = models.CharField(max_length=100, default='text')
    border = models.BooleanField(default=False)
    text = models.TextField(blank=True)
    image = models.ForeignKey(
        Image, null=True, on_delete=models.CASCADE, related_name='sections')
    video = models.CharField(blank=True, max_length=200)


    # not a field for the same reasoning as Page's owner
    @property
    def owner(self):
        return self.page.owner

    @property
    def private(self):
        return self.page.private

    class Meta:
        ordering = ['index']

    def __str__(self):
        return self.name


class PortfolioLink(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, unique=True)
    name = models.CharField(blank=True, max_length=100)
    icon = models.IntegerField(default=0)
    address = models.TextField(blank=True)
    index = models.IntegerField(default=0)

    portfolio = models.ForeignKey(
        Portfolio,
        on_delete=models.CASCADE,
        related_name='links',
    )

    @property
    def owner(self):
        return self.portfolio.owner

    def __str__(self):
        if len(self.name) > 0:
            return self.name
        else:
            return self.address


class SectionLink(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)
    name = models.CharField(blank=True, max_length=100)
    icon = models.IntegerField(default=0)
    address = models.TextField(blank=True)
    index = models.IntegerField(default=0)

    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name='links',
    )

    @property
    def owner(self):
        return self.section.owner
    
    def __str__(self):
        if len(self.name) > 0:
            return self.name
        else:
            return self.address
