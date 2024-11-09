# views/workshop_views.py

from rest_framework import generics
from ..serializers import WorkshopSerializer
from ..models import Workshop

class WorkshopList(generics.ListAPIView):
    queryset = Workshop.objects.all()
    serializer_class = WorkshopSerializer
