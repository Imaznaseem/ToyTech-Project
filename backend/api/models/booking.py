from django.db import models
from django.core.mail import send_mail
from django.conf import settings
<<<<<<< HEAD:backend/api/models.py


class BookingDate(models.Model):
    date = models.DateField()
    available_slots = models.IntegerField()  # Example field for available slots
    location = models.CharField(max_length=255)  # Example field for location
    workshop = models.ForeignKey(
        'Workshop',  # Reference to the Workshop model
        on_delete=models.CASCADE,
        related_name="booking_dates",
        null=True,  # Temporarily allow null values for this migration
        blank=True  # Optional: Allow blank values in forms
    )

    def __str__(self):
        return f"{self.date} - {self.location}"



class Workshop(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    available_slots = models.PositiveIntegerField()  # Number of available slots for the workshop
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f"{self.title} on {self.date} at {self.time}"
=======
from .workshops import Workshop
>>>>>>> testing_frontend:backend/api/models/booking.py


# models.py

class WorkshopBooking(models.Model):
    ORGANIZATION_TYPES = [
        ('school', 'School'),
        ('company', 'Company'),
        ('private', 'Private Individual'),
    ]
    HEAR_ABOUT_US_CHOICES = [
        ('website', 'Website'),
        ('social_media', 'Social Media'),
        ('word_of_mouth', 'Word of Mouth'),
        ('advertisement', 'Advertisement'),
    ]

    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name="bookings")
<<<<<<< HEAD:backend/api/models.py
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    title = models.CharField(max_length=50, blank=True, null=True)
    first_name = models.CharField(max_length=255, default="Anonymous")
    last_name = models.CharField(max_length=100, blank=True, null=True, default="Anonymous")
    email = models.EmailField(blank=True, null=True)  # If email is required, add `default="user@example.com"`
    phone_number = models.CharField(max_length=15, blank=True, null=True, default="0000000000")
    organization_type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES, default="private")
    organization_name = models.CharField(max_length=200, blank=True, null=True, default="Not Provided")
    postcode = models.CharField(max_length=20, blank=True, null=True, default="00000")
    hear_about_us = models.CharField(max_length=20, choices=HEAR_ABOUT_US_CHOICES, blank=True, null=True, default="other")
    message = models.TextField(default="No message provided")
=======
    contact_name = models.CharField(max_length=100)  # Lagt till kontaktpersonens namn
    organization_name = models.CharField(max_length=200, blank=True, null=True)
    organization_type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    number_of_attendees = models.PositiveIntegerField()
    additional_message = models.TextField(blank=True, null=True)
>>>>>>> testing_frontend:backend/api/models/booking.py
    created_at = models.DateTimeField(auto_now_add=True)
    workshop_date = models.DateTimeField()
    is_confirmed = models.BooleanField(default=False)  # Whether the booking has been confirmed

    def __str__(self):
<<<<<<< HEAD:backend/api/models.py
        return f"Booking for {self.workshop.title} by {self.first_name} {self.last_name}"
=======
        return f"Booking for {self.workshop.title} by {self.contact_name}"
>>>>>>> testing_frontend:backend/api/models/booking.py

    def save(self, *args, **kwargs):
        is_new = self.pk is None  # Check if this is a new booking
        super().save(*args, **kwargs)  # Save the instance

        if is_new:
            # Send verification email to the user
          #  self.send_verification_email()

            # Send notification email to the admin or workshop owner
           # self.send_notification_to_admin()
           pass


    def send_verification_email(self):
        subject = "Workshop Booking Confirmation"
        message = f"Dear {self.contact_name},\n\n" \
                  f"Your booking for the workshop '{self.workshop.title}' has been received.\n" \
                  f"Details:\n" \
                  f"Organization Type: {self.organization_type}\n" \
                  f"Number of Attendees: {self.number_of_attendees}\n\n" \
                  f"Thank you for booking with us!"
        recipient_list = [self.email]
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)

    def send_notification_to_admin(self):
        subject = "New Workshop Booking"
        message = f"A new booking has been made for the workshop '{self.workshop.title}' by {self.contact_name}.\n\n" \
                  f"Details:\n" \
                  f"Organization Type: {self.organization_type}\n" \
                  f"Number of Attendees: {self.number_of_attendees}\n" \
                  f"Contact Email: {self.email}\n" \
                  f"Phone Number: {self.phone_number}"
        admin_email = settings.DEFAULT_FROM_EMAIL  # You can specify the admin email address here
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [admin_email])
