# permissions.py
from rest_framework import permissions

class IsProfileOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allows access only if the user is the owner of the profile
        return obj == request.user
