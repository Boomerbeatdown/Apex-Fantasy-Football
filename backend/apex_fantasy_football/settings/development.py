# settings/development.py

from .base import *
import os
from dotenv import load_dotenv

# Enable debug mode for development
DEBUG = True

# Load environment variables from .env file
load_dotenv()

# Use environment variable for SECRET_KEY; no fallback for production security
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-^1+84%+zsjl5ege-+2ix7(*119a9&k&hxrcj3wyu*87d%8ec02')

# Local Development Hosts
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'backend']

# Database Configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'apex_fantasy_football_db'),
        'USER': os.getenv('DB_USER', 'boomerbeatdown'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'sooners7'),
        'HOST': os.getenv('DB_HOST', 'db'),  # Set 'db' as the default host for Docker
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}


# CORS settings to allow local development frontends
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Django REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',  # For browser sessions
        'rest_framework.authentication.TokenAuthentication',     # For API clients
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',            # Requires authentication by default
    ),
}

# Debug-Sensitive Configurations
if DEBUG:
    # Add Django Debug Toolbar and other development-only apps here
    INSTALLED_APPS += [
        'debug_toolbar',  # Example development tool
    ]
    
    MIDDLEWARE += [
        'debug_toolbar.middleware.DebugToolbarMiddleware',  # Middleware for Debug Toolbar
    ]
    
    INTERNAL_IPS = [
        '127.0.0.1',
    ]
    
    # Show all logging messages in the console
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
            },
        },
        'root': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    }
