# serializers/workshop_serializer.py

from rest_framework import serializers
from ..models import Workshop

class WorkshopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = ['id', 'title', 'description', 'image']  # Uppdatera till de fält som finns i modellen
