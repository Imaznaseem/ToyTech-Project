# backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path("api/", include("api.urls")),  
    path("api-auth/", include("rest_framework.urls")), 
=======
    path('api/', include('api.urls')),  # Inkludera alla rutter från api/urls.py
>>>>>>> testing_frontend
]

# Lägg till stöd för mediafiler
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
