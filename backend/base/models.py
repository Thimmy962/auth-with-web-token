from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    body = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.owner.username