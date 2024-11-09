# serializers/booking_serializer.py

from rest_framework import serializers
from ..models import WorkshopBooking
from .workshop_serializer import WorkshopSerializer

class WorkshopBookingSerializer(serializers.ModelSerializer):
    workshop = WorkshopSerializer(read_only=True)

    class Meta:
        model = WorkshopBooking
        fields = [
            'id', 'workshop', 'user', 'organization_name', 'organization_type',
            'email', 'phone_number', 'number_of_attendees', 'additional_message', 'created_at', 'is_confirmed'
        ]
        read_only_fields = ['user', 'is_confirmed', 'created_at']
