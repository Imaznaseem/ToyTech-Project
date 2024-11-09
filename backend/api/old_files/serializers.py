from rest_framework import serializers
from django.contrib.auth.models import User
from .models import WorkshopBooking, Workshop

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # Create a new user with a hashed password
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class WorkshopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = ['id', 'title', 'description', 'location', 'available_slots', 'date', 'time']

class WorkshopBookingSerializer(serializers.ModelSerializer):
    workshop = WorkshopSerializer(read_only=True)

    class Meta:
        model = WorkshopBooking
        fields = [
            'id', 'workshop', 'user', 'organization_name', 'organization_type',
            'email', 'phone_number', 'number_of_attendees', 'additional_message', 'created_at', 'is_confirmed'
        ]
        read_only_fields = ['user', 'is_confirmed', 'created_at']

