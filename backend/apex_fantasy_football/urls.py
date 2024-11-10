# apex_fantasy_football/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings

# Import custom registration view (if defined in `fantasy/views.py`)
from fantasy.views import register

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),  # Django's built-in auth views
    path('register/', register, name='register'),            # Custom registration view
    path('api/', include('fantasy.urls')),                   # Routes to URLs in the fantasy app

    # Authentication and registration endpoints
    path('auth/', include('dj_rest_auth.urls')),             # Login, logout, and password change
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # Registration endpoints

    # Django REST framework's built-in authentication (for browsable API login)
    path('api-auth/', include('rest_framework.urls')),  
]

# Include Debug Toolbar URLs if in DEBUG mode
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
