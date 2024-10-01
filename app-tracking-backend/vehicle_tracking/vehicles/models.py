from django.db import models
from django.contrib.auth.models import User

class Vehicle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    license_plate = models.CharField(max_length=10)
    last_latitude = models.FloatField()
    last_longitude = models.FloatField()
    
    def __str__(self):
        return self.license_plate
