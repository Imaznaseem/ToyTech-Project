from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny  
from .serializers import UserSerializer, WorkshopBookingSerializer, WorkshopSerializer
from .models import WorkshopBooking, Workshop
from rest_framework.response import Response
from .models import BookingDate  
from .serializers import BookingDateSerializer
from .permissions import IsAdminUser
from rest_framework.views import APIView

class AddBookingDateView(generics.CreateAPIView):
    queryset = BookingDate.objects.all()
    serializer_class = BookingDateSerializer
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class UserStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"is_staff": request.user.is_staff})

