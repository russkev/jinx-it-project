from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

from datetime import datetime
from django.dispatch import receiver

from account.signals import account_created

import uuid
import os

@receiver(account_created)
def create_default_portfolio(sender, **kwargs):
    account = kwargs.get('account')
    portfolio = Portfolio.objects.create(
        owner=account.user,
        name='My Portfolio',
        theme="Arch",
    )
    page = Page.objects.create(
        portfolio=portfolio,
        name='First Page',
        index=0,
    )
    Section.objects.create(
        page=page,
        name='Hello There!',
        index='0',
        type='text',
        text='Welcome to Jinx\'s portfolio creation software! '
        'This is a default portfolio, feel free to modify or delete.',
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

    def __str__(self):
        return self.name


class Page(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)

    portfolio = models.ForeignKey(
        Portfolio, on_delete=models.CASCADE, related_name='pages')
    name = models.CharField(max_length=100)
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
