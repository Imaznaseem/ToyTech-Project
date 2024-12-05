# api/urls.py
from django.urls import path
from .views.admin_views import (
    RegisterAdminView,
    UpdateAdminView,
    DeleteAdminView,
    AdminDashboardView,
    AdminLoginView,
    AdminLogoutView,
    AdminProfileView,
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
]
