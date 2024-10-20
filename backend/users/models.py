"""
This module contains the User model for the Apex Fantasy Football application.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('commissioner', 'Commissioner'),
        ('owner', 'Owner'),
        ('player', 'Player'),
    ]
    
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='player')
    
    def __str__(self):
        return str(self.username or '')

