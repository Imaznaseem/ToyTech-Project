from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny  
from .serializers import UserSerializer, WorkshopBookingSerializer, WorkshopSerializer
from .models import WorkshopBooking, Workshop

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

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

class WorkshopList(generics.ListAPIView):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer


