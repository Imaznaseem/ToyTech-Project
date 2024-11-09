# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from api.routes.user_views import CreateUserView, LoginView

urlpatterns = [
    path('admin/', admin.site.urls),  # Django Admin
    path('api/', include('api.urls')),  # Include the URLs from the Api app
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('user/login/', LoginView.as_view(), name='login'),  # Lägg till inloggnings-URL
]

