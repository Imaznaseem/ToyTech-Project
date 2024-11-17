from rest_framework import generics, permissions, status
from rest_framework.response import Response
from ..serializers import WorkshopBookingSerializer
from ..models import WorkshopBooking


class WorkshopBookingCreateView(generics.CreateAPIView):
    """
    View to allow anyone to create a booking.
    """
    serializer_class = WorkshopBookingSerializer
    permission_classes = [permissions.AllowAny]  # Anyone can access this endpoint

    def perform_create(self, serializer):
        # Create the booking without associating it with an authenticated user
        booking = serializer.save()
        # Optionally send emails
        booking.send_verification_email()
        booking.send_notification_to_admin()


class WorkshopBookingListView(generics.ListAPIView):
    """
    View to list bookings for authenticated users only.
    """
    serializer_class = WorkshopBookingSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users

    def get_queryset(self):
        # Return bookings for the authenticated user
        return WorkshopBooking.objects.filter(email=self.request.user.email)


class WorkshopBookingRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to retrieve, update, or delete a specific booking for authenticated users.
    """
    serializer_class = WorkshopBookingSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users
    lookup_field = "pk"

    def get_queryset(self):
        # Ensure users can only interact with their bookings
        return WorkshopBooking.objects.filter(email=self.request.user.email)

    def perform_update(self, serializer):
        # Perform update logic
        serializer.save()

    def perform_destroy(self, instance):
        # Perform delete logic
        instance.delete()
