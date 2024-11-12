# api/urls.py
from django.urls import path
from api.views.employees_views import (
    RegisterEmployeeView,
    EmployeeDashboardView,
    EmployeeLoginView,
    EmployeeLogoutView,
    EmployeeProfileView,
)
from .views.workshop_views import WorkshopListView

urlpatterns = [
    path("workshops/", WorkshopListView.as_view(), name="workshop-list"),
    path("employee/register/", RegisterEmployeeView.as_view(), name="employee-register"),
    path("employee/dashboard/", EmployeeDashboardView.as_view(), name="employee-dashboard"),
    path("employee/login/", EmployeeLoginView.as_view(), name="employee-login"),
    path("employee/logout/", EmployeeLogoutView.as_view(), name="employee-logout"),
    path("employee/profile/", EmployeeProfileView.as_view(), name="employee-profile"),
]
