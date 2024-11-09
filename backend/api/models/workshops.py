# models/workshop.py

from django.db import models

class Workshop(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    available_slots = models.PositiveIntegerField()  # Number of available slots for the workshop
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f"{self.title} on {self.date} at {self.time}"