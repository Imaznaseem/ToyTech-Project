from django.urls import path
from .routes.user_views import CreateUserView, LoginView, LogoutView, UserProfileView

urlpatterns = [
    # Användarrelaterade rutter
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("user/login/", LoginView.as_view(), name="login"),
    path("user/logout/", LogoutView.as_view(), name="logout"),
    path("user/profile/", UserProfileView.as_view(), name="profile"),
]
