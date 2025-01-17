from django.db import models
from django.core.mail import send_mail
from django.conf import settings
from .workshops import Workshop


# models.py

class WorkshopBooking(models.Model):
    ORGANIZATION_TYPES = [
        ('school', 'School'),
        ('company', 'Company'),
        ('private', 'Private Individual'),
    ]

    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name="bookings")
    contact_name = models.CharField(max_length=100)  # Lagt till kontaktpersonens namn
    organization_name = models.CharField(max_length=200, blank=True, null=True)
    organization_type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    number_of_attendees = models.PositiveIntegerField()
    additional_message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    workshop_date = models.DateTimeField()
    is_confirmed = models.BooleanField(default=False)  # Whether the booking has been confirmed

    def __str__(self):
        return f"Booking for {self.workshop.title} by {self.contact_name}"

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
