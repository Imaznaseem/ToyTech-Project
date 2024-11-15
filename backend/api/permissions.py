# api/permissions.py

from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Custom permission to allow only admin users (is_staff).
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff
