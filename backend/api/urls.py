# api/urls.py
from django.urls import path
<<<<<<< HEAD
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
=======

from .views.csrf_views import csrf_token_view

from .views.admin_views import (
    RegisterAdminView,
    UpdateAdminView,
    DeleteAdminView,
    AdminDashboardView,
    AdminLoginView,
    AdminLogoutView,
    AdminProfileView,
    CheckLoginView,
)
from api.views.workshop_views import (
    WorkshopListView, 
    WorkshopDetailView, 
    WorkshopCreateView,
)
from .views.booking_views import (
    WorkshopBookingCreateView,
    WorkshopBookingListView,
    WorkshopBookingRetrieveUpdateDeleteView,
)

urlpatterns = [
>>>>>>> testing_frontend

    path("csrf/", csrf_token_view, name="csrf-token"),

    path("bookings/create/", WorkshopBookingCreateView.as_view(), name="booking-create"),
    path("bookings/", WorkshopBookingListView.as_view(), name="booking-list"),
    path("bookings/<int:pk>/", WorkshopBookingRetrieveUpdateDeleteView.as_view(), name="booking-detail"),

    path("workshops/", WorkshopListView.as_view(), name="workshop-list"),
    path("workshops/create/", WorkshopCreateView.as_view(), name="workshop-create"),
    path("workshops/<int:pk>/", WorkshopDetailView.as_view(), name="workshop-detail"),
    
    path("admin/register/", RegisterAdminView.as_view(), name="admin-register"),
    path("admin/update/", UpdateAdminView.as_view(), name="admin-update"),
    path("admin/delete/", DeleteAdminView.as_view(), name="admin-delete"),
    path("admin/dashboard/", AdminDashboardView.as_view(), name="admin-dashboard"),
    path("admin/login/", AdminLoginView.as_view(), name="admin-login"),
    path("admin/logout/", AdminLogoutView.as_view(), name="admin-logout"),
    path("admin/profile/", AdminProfileView.as_view(), name="admin-profile"),
    path("admin/check/", CheckLoginView.as_view(), name="admin-check"),
]
