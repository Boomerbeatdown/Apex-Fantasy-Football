# settings/development.py

from .base import *
import os

DEBUG = True

# Use environment variable for SECRET_KEY, with a fallback for development
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-^1+84%+zsjl5ege-+2ix7(*119a9&k&hxrcj3wyu*87d%8ec02')

# Local Development Hosts
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Local Database Settings with Environment Variable Support
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'apex_fantasy_football_db'),
        'USER': os.getenv('DB_USER', 'boomerbeatdown'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'sooners7'),
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# CORS settings to allow local development frontends
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',  # For browser sessions
        'rest_framework.authentication.TokenAuthentication',     # For API clients
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',            # Requires authentication by default
    ),
}
