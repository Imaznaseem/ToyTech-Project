# views/user_views.py

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import UserSerializer

class CreateUserView(generics.CreateAPIView):
    """
    Vy för att skapa en ny användare.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Tillåter alla att registrera sig

class LoginView(APIView):
    """
    Vy för att hantera inloggning och skapa en session.
    """
    permission_classes = [AllowAny]  # Tillåter alla att logga in

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Skapar en session
            return Response({"detail": "Inloggning lyckades"}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Fel användarnamn eller lösenord"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    """
    Vy för att hantera utloggning och avsluta sessionen.
    """
    permission_classes = [AllowAny]  # Tillåter alla att logga ut

    def post(self, request):
        logout(request)  # Avslutar sessionen
        return Response({"detail": "Utloggad"}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    """
    Vy för att hantera användarprofil, endast åtkomlig för inloggade användare.
    """
    def get(self, request):
        if request.user.is_authenticated:
            user_data = {
                "username": request.user.username,
                "email": request.user.email,
            }
            return Response(user_data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Inte inloggad"}, status=status.HTTP_401_UNAUTHORIZED)
