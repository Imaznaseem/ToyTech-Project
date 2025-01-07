from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from ..serializers import BlogPostSerializer
from ..models import BlogPost

class BlogPostListView(generics.ListAPIView):
    """
    View to list all blog posts.
    """
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]  # Allow read access to everyone

class BlogPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Protected view to retrieve, update, or delete a specific blog post (Admins only for update/delete).
    """
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users

    def perform_update(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Only admins can update blog posts.")
        serializer.save()

    def perform_destroy(self, instance):
        if not self.request.user.is_staff:
            raise PermissionDenied("Only admins can delete blog posts.")
        instance.delete()

class BlogPostCreateView(generics.CreateAPIView):
    """
    Protected view to create a new blog post (Admins only).
    """
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users
    parser_classes = [MultiPartParser, FormParser]  # Support for multipart form data

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("Only admins can create blog posts.")
        serializer.save()