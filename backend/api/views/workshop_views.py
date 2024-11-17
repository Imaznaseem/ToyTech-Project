from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from ..serializers import WorkshopSerializer
from ..models import Workshop

class WorkshopListView(generics.ListAPIView):
    """
    View to list all workshops.
    """
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Allow read access to everyone

class WorkshopDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to retrieve, update, or delete a specific workshop.
    """
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Allow updates only for authenticated users

class WorkshopCreateView(generics.CreateAPIView):
    """
    View to create a new workshop.
    """
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Allow authenticated users to create
