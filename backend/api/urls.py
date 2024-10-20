from django.urls import path
from .views import CreateUserView, WorkshopBookingListCreate, WorkshopList

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('workshops/', WorkshopList.as_view(), name='workshop-list'),
    path('bookings/', WorkshopBookingListCreate.as_view(), name='workshop-booking'),
]

