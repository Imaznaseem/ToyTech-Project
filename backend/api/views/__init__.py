# views/__init__.py

from .admin_views import (
    RegisterAdminView,
    UpdateAdminView,
    DeleteAdminView,
    AdminDashboardView,
    AdminLoginView,
    AdminLogoutView,
    AdminProfileView,
)
from .booking_views import WorkshopBookingListView
from .workshop_views import WorkshopListView
from .csrf_views import csrf_token_view