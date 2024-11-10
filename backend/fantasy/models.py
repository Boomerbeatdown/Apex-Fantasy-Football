from django.conf import settings
from django.db import models

class Profile(models.Model):
    """Model representing a user profile with an optional profile picture."""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return f"{self.user}'s Profile"


class League(models.Model):
    """Model representing a fantasy football league."""
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    commissioner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="leagues"
    )
    scoring_system = models.TextField(default="Standard")
    max_teams = models.PositiveIntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Team(models.Model):
    """Model representing a team in a fantasy football league."""
    name = models.CharField(max_length=255)
    league = models.ForeignKey(
        League,
        on_delete=models.CASCADE,
        related_name="teams"
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="teams"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    roster = models.JSONField(default=dict)  # Flexible storage for players, could hold player IDs or stats

    def __str__(self):
        return f"{self.name} in {self.league.name}"


class Player(models.Model):
    """Model representing a player on a fantasy football team."""
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=20)
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="players"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.position})"
