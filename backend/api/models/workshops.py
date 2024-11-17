# models/workshop.py

from django.db import models

class Workshop(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    

    def __str__(self):
        return f"{self.title} on {self.date} at {self.time}"