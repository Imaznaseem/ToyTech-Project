from rest_framework import serializers
from django.contrib.auth.models import User
from .models import WorkshopBooking, Workshop, BookingDate


class BookingDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingDate
        fields = ['date', 'available_slots', 'location']
        
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
    booking_dates = BookingDateSerializer(many=True, read_only=True)

    class Meta:
        model = Workshop
        fields = ['id', 'title', 'description', 'location', 'available_slots', 'date', 'time', 'booking_dates']

# serializers.py

class WorkshopBookingSerializer(serializers.ModelSerializer):
    workshop = serializers.PrimaryKeyRelatedField(queryset=Workshop.objects.all())

    class Meta:
        model = WorkshopBooking
        fields = [
            'id', 'workshop', 'user', 'title', 'first_name', 'last_name', 'email',
            'phone_number', 'organization_type', 'organization_name', 'postcode',
            'hear_about_us', 'message', 'created_at', 'is_confirmed'
        ]
        read_only_fields = ['user', 'is_confirmed', 'created_at']



