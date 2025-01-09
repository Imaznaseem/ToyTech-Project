from rest_framework import serializers
from api.models.blog import BlogPost 

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'image', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']  