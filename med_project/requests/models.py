from django.db import models
from account.models import User


class Request(models.Model):

    class Request_Type(models.IntegerChoices):
        ADD_DOCTOR = 1
        REMOVE_DOCTOR = 2

    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="outcoming_requests")
    reciever = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="incoming_requests")
    type = models.IntegerField(choices=Request_Type.choices)
