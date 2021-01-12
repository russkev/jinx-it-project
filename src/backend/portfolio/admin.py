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
    list_display = ['name', 'owner', 'id', 'private']
    inlines = [PageInline]

@admin.register(models.Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ['name', 'portfolio', 'index', 'owner', 'id']
    inlines = [SectionInline]

@admin.register(models.Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'page', 'index', 'id']

@admin.register(models.Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ['icon', 'title', 'address', 'id', 'index']








# @admin.register(models.PortfolioLink)
# class PortfolioLinkAdmin(admin.ModelAdmin):
#     list_display = ['link_id', 'portfolio_id']

# @admin.register(models.PageLink)
# class PageLinkAdmin(admin.ModelAdmin):
#     list_display = ['link_id', 'page_id']

# @admin.register(models.SectionLink)
# class SectionLinkAdmin(admin.ModelAdmin):
#     list_display = ['link_id', 'section_id']
