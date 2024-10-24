# apex_fantasy_football/views.py
# apex_fantasy_football/views.py
from django.shortcuts import render

def register(request):
    return render(request, 'register.html')
