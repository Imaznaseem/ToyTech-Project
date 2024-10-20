from django.urls import path
from .views import WorkshopListCreate, BookingCreate

urlpatterns = [
    path('workshops/', WorkshopListCreate.as_view(), name='workshop-list-create'),
    path('bookings/', BookingCreate.as_view(), name='booking-create'),
]
