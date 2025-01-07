from rest_framework import serializers
from ..models import blog

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = blog
        fields = ['title', 'content', 'image']