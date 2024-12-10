from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from ..serializers import WorkshopBookingSerializer
from ..models import WorkshopBooking
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import logging

logger = logging.getLogger(__name__)


@method_decorator(csrf_exempt, name='dispatch')
class WorkshopBookingCreateView(generics.CreateAPIView):
    """
    View to allow anyone to create a booking.
    """
    queryset = WorkshopBooking.objects.all()
    parser_classes = [JSONParser]  # Ensure JSON is supported
    serializer_class = WorkshopBookingSerializer
    permission_classes = [permissions.AllowAny]  # Anyone can access this endpoint

    def create(self, request, *args, **kwargs):
        try:
            print("Request data:", request.data)  # Debugging input data
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                booking = serializer.save()
                print("Booking saved successfully:", booking)  # Debugging saved object
                print("Serializer data:", serializer.data)  # Debugging response data
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            print("Validation errors:", serializer.errors)  # Debugging validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error during booking creation:", e)  # Debugging unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
