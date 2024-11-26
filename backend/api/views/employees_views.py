# views/employees_views.py

from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import UserSerializer

User = get_user_model()

class RegisterEmployeeView(generics.CreateAPIView):
    """
    View to register a new employee.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow anyone to access the registration

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Spara användaren om all validering går igenom
            return Response(
                {
                    "message": "Registration successful",
                    "user": {
                        "username": user.username,
                        "email": user.email
                    }
                },
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UpdateEmployeeView(APIView):
    permission_classes = [IsAuthenticated]  # Bara inloggade användare

    def patch(self, request):
        user = request.user  # Hämta inloggad användare
        data = request.data
        if "email" in data:
            user.email = data["email"]
        if "password" in data:
            user.set_password(data["password"])  # Hashar lösenord
        user.save()
        return Response({"detail": "User updated successfully"}, status=status.HTTP_200_OK)
    
class DeleteEmployeeView(APIView):
    permission_classes = [IsAuthenticated]  # Bara inloggade användare

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"detail": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class EmployeeDashboardView(APIView):
    """
    View for employee dashboard, only accessible to authenticated users.
    """
    permission_classes = [IsAuthenticated]  # Only accessible if logged in

    def get(self, request):
        # Assuming that you want to display some dashboard info for the employee
        return Response({"detail": f"Welcome to the employee dashboard, {request.user.username}!"}, status=status.HTTP_200_OK)

class EmployeeLoginView(APIView):
    """
    View to handle employee login and create a session.
    """
    permission_classes = [AllowAny]  # Allow anyone to access the login

    def post(self, request):
        # Extract username and password from the request body
        username = request.data.get("username")
        password = request.data.get("password")

        # Check if username and password are provided
        if not username or not password:
            return Response(
                {"detail": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        # If user is valid, log them in
        if user is not None:
            login(request, user)
            return Response(
                {"detail": "Login successful", "username": user.username},
                status=status.HTTP_200_OK,
            )

        # Return error if authentication fails
        return Response(
            {"detail": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

class EmployeeLogoutView(APIView):
    """
    View to handle employee logout and end the session.
    """
    permission_classes = [IsAuthenticated]  # Only logged-in users can log out

    def post(self, request):
        logout(request)  # End the session
        return Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)

class EmployeeProfileView(APIView):
    """
    View to handle employee profile, only accessible to authenticated users.
    """
    permission_classes = [IsAuthenticated]  # Only accessible if logged in

    def get(self, request):
        employee_data = {
            "username": request.user.username,
            "email": request.user.email,
        }
        return Response(employee_data, status=status.HTTP_200_OK)
