from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from ..serializers import WorkshopSerializer
from ..models import Workshop

class WorkshopListView(generics.ListAPIView):
    """
    View to list all workshops.
    """
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [AllowAny]  # Allow read access to everyone

class WorkshopDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Protected view to retrieve, update, or delete a specific workshop (Admins only for update/delete).
    """
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [IsAuthenticated]  # Endast autentiserade användare

    def perform_update(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Endast admins kan uppdatera workshops.")
        serializer.save()

    def perform_destroy(self, instance):
        if not self.request.user.is_staff:
            raise PermissionDenied("Endast admins kan ta bort workshops.")
        instance.delete()

class WorkshopCreateView(generics.CreateAPIView):
    """
    Protected view to create a new workshop (Admins only).
    """
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [IsAuthenticated]  # Endast autentiserade användare

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Endast admins kan skapa workshops.")
        serializer.save()
