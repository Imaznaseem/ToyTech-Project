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
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Create a session
            return Response({"detail": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)

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
