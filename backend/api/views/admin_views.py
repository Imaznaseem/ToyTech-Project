# views/admin_views.py

from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import UserSerializer


User = get_user_model()

class RegisterAdminView(APIView):
    """
    View to register a new admin. Only accessible to superusers.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Check if the user is a superuser
        if not request.user.is_superuser:
            return Response(
                {"detail": "Du har inte behörighet att skapa admins."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_staff = True  # Make the user an admin
            user.save()
            return Response(
                {
                    "message": "Admin skapad framgångsrikt.",
                    "user": {"username": user.username, "email": user.email},
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UpdateAdminView(APIView):
    """
    View to update an admin's details. Accessible to superusers.
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        if not request.user.is_superuser:
            return Response(
                {"detail": "Du har inte behörighet att uppdatera admins."},
                status=status.HTTP_403_FORBIDDEN,
            )

        username = request.data.get("username")
        try:
            user = User.objects.get(username=username, is_staff=True)
            if "email" in request.data:
                user.email = request.data["email"]
            if "password" in request.data:
                user.set_password(request.data["password"])  # Hash the password
            user.save()
            return Response({"detail": "Admin uppdaterad framgångsrikt."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "Admin hittades inte."}, status=status.HTTP_404_NOT_FOUND)

class DeleteAdminView(APIView):
    """
    View to delete an admin. Only accessible to superusers.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        if not request.user.is_superuser:
            return Response(
                {"detail": "Du har inte behörighet att ta bort admins."},
                status=status.HTTP_403_FORBIDDEN,
            )

        username = request.data.get("username")
        try:
            user = User.objects.get(username=username, is_staff=True)
            user.delete()
            return Response({"detail": "Admin borttagen framgångsrikt."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"detail": "Admin hittades inte."}, status=status.HTTP_404_NOT_FOUND)

class AdminDashboardView(APIView):
    """
    View for admin dashboard, only accessible to authenticated admins.
    """

    def get(self, request):
        # Debug-utskrifter
        print(f"Session Key: {request.session.session_key}")
        print(f"Cookies: {request.COOKIES}")
        print(f"X-CSRFToken header: {request.headers.get('X-CSRFToken')}")
        print(f"Authenticated user: {request.user}")
        print(f"Is authenticated: {request.user.is_authenticated}")
        print(f"Is staff: {request.user.is_staff}")
        print(f"Is superuser: {request.user.is_superuser}")

        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Du måste vara inloggad för att få tillgång till denna vy."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Check if the user is staff
        if not request.user.is_staff:
            return Response(
                {
                    "detail": "Endast admins har tillgång till denna vy.",
                    "username": request.user.username,
                    "is_staff": request.user.is_staff,
                    "is_superuser": request.user.is_superuser,
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Respond with success if all checks pass
        return Response(
            {
                "detail": f"Välkommen till admin-dashboard, {request.user.username}!",
                "username": request.user.username,
                "is_staff": request.user.is_staff,
                "is_superuser": request.user.is_superuser,
            },
            status=status.HTTP_200_OK,
        )


class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(f"Request data: {request.data}")
        username = request.data.get("username")
        password = request.data.get("password")
        print(f"Username: {username}, Password: {password}")

        if not username or not password:
            return Response({"detail": "Användarnamn och lösenord krävs."}, status=400)

        user = authenticate(request, username=username, password=password)

        if user is not None and user.is_staff:
            # Logga in användaren och skapa session
            login(request, user)
            print(f"Session key efter inloggning: {request.session.session_key}")

            return Response({"detail": "Inloggning lyckades", "username": user.username}, status=200)

        return Response({"detail": "Ogiltigt användarnamn eller lösenord."}, status=401)
class AdminLogoutView(APIView):
    """
    View to handle admin logout and end the session.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        response = Response({"detail": "Utloggning lyckades."}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")  # Radera cookien
        return response

class AdminProfileView(APIView):
    """
    View to display admin profile information. Only accessible to authenticated admins.
    """
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_staff:
            return Response(
                {"detail": "Endast admins har tillgång till denna vy."},
                status=status.HTTP_403_FORBIDDEN,
            )
        admin_data = {
            "username": request.user.username,
            "email": request.user.email,
        }
        return Response(admin_data, status=status.HTTP_200_OK)
    
class CheckLoginView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Kontrollera om användaren är autentiserad
        if not request.user.is_authenticated:
            return Response({"detail": "Inte inloggad."}, status=401)

        # Kontrollera om användaren är admin
        if not request.user.is_staff:
            return Response({"detail": "Du har inte behörighet att se denna sida."}, status=403)

        return Response({"detail": "Validering lyckades.", "username": request.user.username}, status=200)
