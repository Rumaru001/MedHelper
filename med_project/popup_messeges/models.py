from django.db import models
from account.models import User


class Message(models.Model):
    text = models.CharField(max_length=1024)
    user = models.ForeignKey(User, related_name="messeges",
                             on_delete=models.CASCADE)
