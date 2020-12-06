from rest_framework import permissions
from .models import User


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        user = User.objects.get(pk=view.kwargs['pk'])
        if request.user == user:
            return True
        return False
