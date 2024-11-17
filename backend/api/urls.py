# api/urls.py
from django.urls import path
from api.views.employees_views import (
    RegisterEmployeeView,
    EmployeeDashboardView,
    EmployeeLoginView,
    EmployeeLogoutView,
    EmployeeProfileView,
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
    
    path("employee/register/", RegisterEmployeeView.as_view(), name="employee-register"),
    path("employee/dashboard/", EmployeeDashboardView.as_view(), name="employee-dashboard"),
    path("employee/login/", EmployeeLoginView.as_view(), name="employee-login"),
    path("employee/logout/", EmployeeLogoutView.as_view(), name="employee-logout"),
    path("employee/profile/", EmployeeProfileView.as_view(), name="employee-profile"),
]
