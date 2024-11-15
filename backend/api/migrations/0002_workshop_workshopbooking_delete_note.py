# Generated by Django 5.1.1 on 2024-10-13 13:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Workshop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('available_dates', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='WorkshopBooking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(max_length=15)),
                ('organization_type', models.CharField(choices=[('school', 'School'), ('company', 'Company'), ('private', 'Private Individual')], max_length=10)),
                ('message', models.TextField()),
                ('booked_date', models.DateField()),
                ('workshop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.workshop')),
            ],
        ),
        migrations.DeleteModel(
            name='Note',
        ),
    ]