from django.urls import path
from .views import CreateUserView, WorkshopBookingListCreate, WorkshopList
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('workshops/', WorkshopList.as_view(), name='workshop-list'),
    path('bookings/', WorkshopBookingListCreate.as_view(), name='workshop-booking'),
]

