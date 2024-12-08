from django.urls import path
from .views import CreateUserView, WorkshopBookingListCreate, WorkshopList, AddBookingDateView, UserStatusView,  WorkshopWithDatesList
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/add-booking-date/', AddBookingDateView.as_view(), name='add-booking-date'),
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('workshops/', WorkshopList.as_view(), name='workshop-list'),
    path('bookings/', WorkshopBookingListCreate.as_view(), name='workshop-booking'),
    path('workshops/with-dates/', WorkshopWithDatesList.as_view(), name='workshops-with-dates'),
    path("user/status/", UserStatusView.as_view(), name="user-status"),
    path('bookings/', WorkshopBookingListCreate.as_view(), name='workshop-booking'),
    
]

