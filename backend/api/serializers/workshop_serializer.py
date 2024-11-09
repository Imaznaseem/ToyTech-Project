# serializers/workshop_serializer.py

from rest_framework import serializers
from ..models import Workshop

class WorkshopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = ['id', 'title', 'description', 'location', 'available_slots', 'date', 'time']
