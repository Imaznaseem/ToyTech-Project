# serializers/booking_serializer.py

from rest_framework import serializers
from ..models import WorkshopBooking
from ..models import Workshop

class WorkshopBookingSerializer(serializers.ModelSerializer):
    workshop = serializers.PrimaryKeyRelatedField(queryset=Workshop.objects.all())
    class Meta:
        model = WorkshopBooking
        fields = '__all__'

