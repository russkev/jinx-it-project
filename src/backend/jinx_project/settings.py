"""
Django settings for jinx_project project.

Generated by 'django-admin startproject' using Django 3.1.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# dot in front will match all our subdomains
ALLOWED_HOSTS = ['127.0.0.1', 'kjinx.mooo.com', '.kjinx.mooo.com']
# ALLOWED_HOSTS = ['*']


# Corsheader settings.
# Sets which sites are allowed to contact the api
# This should be set to where the front end will be served.
CORS_ORIGIN_ALLOW_ALL = True
# CORS_ALLOWED_ORIGINS = (
#     'https://elastic-allen-99fad7.netlify.app',
#     'http://localhost:3000',
#     'localhost:3000'
# )
# CORS_ALLOWED_ORIGIN_REGEXES = (
#     'https:\/\/elastic\-allen\-99fad7\.netlify\.app*'
# )

# Prevent browsers from sending cookies if on http
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
    'corsheaders',
    'drf_yasg',
    # our django apps
    'common',
    'api',
    'account',
    'portfolio',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'jinx_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'jinx_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# TODO: is this secure enough?
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'jinx_db',
        'USER': 'jinx',
        'PASSWORD': os.getenv('DJANGO_DB_PASSWORD'),
        'HOST': 'db',
        'PORT': 5432,
    }
}

# Keep the connection to the server open instead of closing on each request
CONN_MAX_AGE = None


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-au'

TIME_ZONE = 'Australia/Melbourne'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

# STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

# User uploaded file
# we don't actually have a cdn lol, but just in case this project grows big enough to need one

# MEDIA_URL = 'https://cdn.jinx.systems/'
# MEDIA_ROOT = '/srv/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
MEDIA_URL = '/media/'


DRF_DEFAULT_RENDERER_CLASSES = (
    'rest_framework.renderers.JSONRenderer',
)

DRF_DEFAULT_AUTHENTICATION_CLASSES = (
    # tokens to be used by djoser
    'rest_framework.authentication.TokenAuthentication',
)


SWAGGER_SECURITY_DEFINITIONS = {
    'Bearer': {
        'type': 'apiKey',
        'name': 'Authorization',
        'in': 'header'
    }
}

SWAGGER_DJANGO_SESSIONS = False

# if development mode, load dev settings to override production settings
if os.getenv('DJANGO_DEV'):
    from .settings_dev import *


# construct REST_FRAMEWORK settings from component fields which can be overriden
# in dev settings file
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': DRF_DEFAULT_RENDERER_CLASSES,
    'DEFAULT_AUTHENTICATION_CLASSES': DRF_DEFAULT_AUTHENTICATION_CLASSES,
}


SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': SWAGGER_SECURITY_DEFINITIONS,
    'USE_SESSION_AUTH': SWAGGER_DJANGO_SESSIONS,
}

# Heroku: Update database configuration from $DATABASE_URL
import dj_database_url
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)

# May need to set heroku settings. 
# See the following at the end of "Deploying the Web App using Heroku"
# https://dev.to/mdrhmn/deploying-react-django-app-using-heroku-2gfa
# May also need to include a .env file from the next step
# If getting error along the lines of:
# "refused to execute script ... MIME type ('text/html')"
# add a view function oulined in above tutorial
