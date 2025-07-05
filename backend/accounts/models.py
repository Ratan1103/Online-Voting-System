from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    is_admin=models.BooleanField(default=False)
    is_voter=models.BooleanField(default=False)
    is_verified=models.BooleanField(default=None,null=True,blank=True)
    age=models.PositiveIntegerField(null=True,blank=True)
    gender=models.CharField(max_length=10,null=True,blank=True)
    region=models.CharField(max_length=100,null=True,blank=True)

# Create your models here.
