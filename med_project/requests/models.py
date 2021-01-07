from .request_actions import AddDoctor, RemoveDoctor
from django.db import models
from account.models import Profile, Doctor


class Request(models.Model):
    REQUEST_TYPE = (
        (1, "ADD_DOCTOR"),
        (2, "REMOVE_DOCTOR")
    )

    patient = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="requests")
    doctor = models.ForeignKey(
        Doctor, on_delete=models.CASCADE, related_name="requests")
    type = models.IntegerField(choices=REQUEST_TYPE)
