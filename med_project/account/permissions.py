from rest_framework import permissions
from .models import User
from rest_framework.exceptions import PermissionDenied


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        user = User.objects.get(pk=view.kwargs['pk'])
        if request.user == user:
            return True
        return False


def has_obj_persmission(request, obj):
    return request.user == obj.user


class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.user_type == 2:
            return True
        return False
