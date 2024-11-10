# apex_fantasy_football/views.py

from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from rest_framework import generics, permissions
from allauth.account.utils import send_email_confirmation
from .serializers import ProfileSerializer
from .permissions import IsProfileOwner  # Custom permission class to restrict access
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path

# Django view to render the registration page with success/error messages
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Registration successful. Please log in.")
            return redirect('login')
        else:
            messages.error(request, "Registration failed. Please check the form for errors.")
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

# API view to retrieve and update user profile information
class ProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsProfileOwner]

    def get_object(self):
        # Fetch or create a Profile linked to the user if using a separate profile model
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile

    def perform_update(self, serializer):
        # Save the updated user profile and trigger email confirmation if email changed
        user = serializer.save()
        if 'email' in serializer.validated_data:
            send_email_confirmation(self.request, user)

# JWT Authentication views
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Additional paths can be added here
]

# List view for leagues with authentication
class LeagueListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    # Ensure the queryset and serializer class are defined here
    ...
