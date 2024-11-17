# serializers/booking_serializer.py

from rest_framework import serializers
from ..models import WorkshopBooking

class WorkshopBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkshopBooking
        fields = [
            'id', 'workshop', 'contact_name', 'organization_name',
            'organization_type', 'email', 'phone_number',
            'number_of_attendees', 'additional_message', 'created_at', 'is_confirmed'
        ]
