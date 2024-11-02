# apex_fantasy_football/urls.py
from django.contrib import admin
from django.urls import path, include
from fantasy.views import register  # Confirm this is correctly defined in fantasy/views.py

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),  # Django's built-in auth views
    path('register/', register, name='register'),             # Custom registration view
    path('api/', include('fantasy.urls')),                    # Route to fantasy app's URLs
]

