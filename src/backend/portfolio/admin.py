from django.contrib import admin

from . import models

class PageInline(admin.TabularInline):
    model = models.Page
    extra = 0

class SectionInline(admin.TabularInline):
    model = models.Section
    extra = 0
    # don't allow adding
    max_num = 0

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['name', 'path', 'owner', 'id']

@admin.register(models.Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['name', 'subtitle', 'private', 'owner', 'id', ]
    inlines = [PageInline]

@admin.register(models.Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ['name', 'portfolio', 'index', 'owner', 'id']
    inlines = [SectionInline]

@admin.register(models.Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'page', 'index', 'owner', 'id']

@admin.register(models.PortfolioLink)
class PortfolioLinkAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'address', 'index', 'portfolio']

@admin.register(models.SectionLink)
class SectionLinkAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'address', 'index', 'section']
