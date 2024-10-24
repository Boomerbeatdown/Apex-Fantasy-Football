# fantasy/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeagueViewSet

router = DefaultRouter()
router.register(r'fantasy', LeagueViewSet)

urlpatterns = [
    path('fantasy/', LeagueViewSet.as_view({'get': 'list'}), name='league-list'),  # Adjust if needed
]

