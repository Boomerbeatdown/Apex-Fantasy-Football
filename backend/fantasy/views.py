from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from allauth.account.utils import send_email_confirmation

from .models import League, Profile, Team, Invitation
from .serializers import LeagueSerializer, ProfileSerializer, TeamSerializer, InvitationSerializer
from .permissions import IsProfileOwner


# Define the LeagueViewSet
class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer


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
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile

    def perform_update(self, serializer):
        user = serializer.save()
        if 'email' in serializer.validated_data:
            send_email_confirmation(self.request, user)


# League Creation and Listing
class LeagueCreateView(generics.CreateAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class LeagueListView(generics.ListAPIView):
    serializer_class = LeagueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return League.objects.filter(created_by=self.request.user)


# Team Creation and Roster Management
class TeamCreateView(generics.CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        league = serializer.validated_data.get("league")
        if league.created_by != self.request.user:
            return Response({"error": "Cannot create a team in a league you don't own."}, status=status.HTTP_403_FORBIDDEN)
        serializer.save(user=self.request.user)


class TeamRosterUpdateView(generics.UpdateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        team = self.get_object()
        new_roster = request.data.get("roster")
        
        if new_roster is None:
            return Response({"error": "No roster data provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        team.roster.set(new_roster)  # Assuming `roster` is a ManyToMany field
        team.save()
        
        return Response({"status": "success", "message": "Roster updated"}, status=status.HTTP_200_OK)


# Invitation System for League
class LeagueInviteView(generics.CreateAPIView):
    serializer_class = InvitationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        league = serializer.validated_data['league']
        invitee_email = serializer.validated_data['email']
        
        send_mail(
            subject=f"Invitation to join {league.name}",
            message=f"You've been invited to join the league {league.name}.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[invitee_email]
        )
        
        serializer.save()


class AcceptInviteView(generics.UpdateAPIView):
    queryset = Invitation.objects.all()
    serializer_class = InvitationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        invitation = serializer.instance
        
        # Only allow the intended invitee to accept the invitation
        if self.request.user.email != invitation.invited_user_email:
            return Response({"error": "You are not authorized to accept this invitation."}, status=status.HTTP_403_FORBIDDEN)
        
        invitation.status = "accepted"
        serializer.save()
        
        return Response({"status": "success", "message": "Invitation accepted"}, status=status.HTTP_200_OK)
