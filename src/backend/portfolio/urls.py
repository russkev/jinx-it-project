from django.contrib import admin
from django.urls import path
from django.conf.urls import include
import uuid
from . import views


urlpatterns = [
    path(
        'portfolios',
        views.PortfolioList.as_view(),
        name='portfolio_list',
    ),
    path(
        'portfolios/<uuid:portfolio_id>',
        views.PortfolioDetail.as_view(),
        name='portfolio_detail',
    ),
    path(
        'portfolios/<uuid:portfolio_id>/pages',
        views.PageList.as_view(),
        name='page_list',
    ),
    path(
        'portfolios/pages/<uuid:page_id>',
        views.PageDetail.as_view(),
        name='page_detail',
    ),
    path(
        'portfolios/pages/<uuid:page_id>/sections',
        views.SectionList.as_view(),
        name='section_list',
    ),
    path(
        'portfolios/pages/sections/<uuid:section_id>',
        views.SectionDetail.as_view(),
        name='section_detail',
    ),
    path(
        'images',
        views.ImageList.as_view(),
        name = 'image_list',
    ),
    path(
        'images/<uuid:image_id>',
        views.ImageDetail.as_view(),
        name = 'image_detail',
    ),
    path(
        'portfolios/<uuid:portfolio_id>/links',
        views.PortfolioLinkList.as_view(),
        name='portfolio_link_list'
    ),
    path(
        'portfolios/links/<uuid:link_id>',
        views.PortfolioLinkDetail.as_view(),
        name='portfolio_link_detail'
    ),
    path(
        'portfolios/pages/sections/<uuid:section_id>/links',
        views.SectionLinkList.as_view(),
        name = 'section_link_list',
    ),
    path(
        'portfolios/pages/sections/links/<uuid:link_id>',
        views.SectionLinkDetail.as_view(),
        name = 'section_link_detail',
    ),
    path(
        'links/<uuid:link_id>',
        views.LinkDetail.as_view(),
        name = 'link_detail'
    )
]
