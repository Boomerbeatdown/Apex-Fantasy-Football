# fantasy/permissions.py
from rest_framework import permissions

class IsProfileOwner(permissions.BasePermission):
    """
    Custom permission to only allow users to edit their own profile.
    """
    def has_object_permission(self, request, view, obj):
        # Assumes the obj has a `user` attribute to compare with the request user
        return obj.user == request.user
