from django.contrib import admin
from django.urls import path
from django.conf.urls import include


urlpatterns = [
    path('', include('account.urls')),
    path('', include('portfolio.urls')),
]
