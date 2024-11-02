from django.conf import settings
from django.db import models

class League(models.Model):
    """Model representing a fantasy football league."""
    
    name = models.CharField(max_length=100)
    commissioner = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='leagues'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Team(models.Model):
    """Model representing a team in a fantasy football league."""
    
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='teams'
    )
    league = models.ForeignKey(
        League, 
        on_delete=models.CASCADE, 
        related_name='teams'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} ({self.league.name})'

class Player(models.Model):
    """Model representing a player on a fantasy football team."""
    
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=20)
    team = models.ForeignKey(
        Team, 
        on_delete=models.CASCADE, 
        related_name='players'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} ({self.position})'
