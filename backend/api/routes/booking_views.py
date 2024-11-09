# views/booking_views.py

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..serializers import WorkshopBookingSerializer
from ..models import WorkshopBooking

class WorkshopBookingListCreate(generics.ListCreateAPIView):
    serializer_class = WorkshopBookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get bookings only made by the authenticated user
        return WorkshopBooking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Associate the booking with the current user
        booking = serializer.save(user=self.request.user)
        # Send email after the booking is saved
        booking.send_verification_email()
        booking.send_notification_to_admin()
