# admin.py

from django.contrib import admin
from .models import WorkshopBooking

@admin.register(WorkshopBooking)
class WorkshopBookingAdmin(admin.ModelAdmin):
    list_display = ['workshop', 'first_name', 'last_name', 'email', 'organization_name', 'is_confirmed', 'created_at']
    list_filter = ['is_confirmed', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'organization_name']

