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
    serializer_class = WorkshopBookingSerializer
    permission_classes = [permissions.IsAuthenticated]  # Endast autentiserade användare
    lookup_field = "pk"

    def get_queryset(self):
        # Tillåt bara åtkomst till bokningar kopplade till användarens e-post
        return WorkshopBooking.objects.filter(email=self.request.user.email)

    def perform_update(self, serializer):
        booking = serializer.save()
        if 'is_confirmed' in serializer.validated_data and serializer.validated_data['is_confirmed']:
            # Skicka notifiering när en bokning bekräftas
            booking.send_notification_to_admin()


    def perform_destroy(self, instance):
        # Perform delete logic
        instance.delete()
