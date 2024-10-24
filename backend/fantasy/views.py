# fantasy/views.py
from django.shortcuts import render
from rest_framework import viewsets
from .models import League
from .serializers import LeagueSerializer

# Define the LeagueViewSet
class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

# Define the register view
def register(request):
    return render(request, 'register.html')

