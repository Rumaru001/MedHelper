from django.db import models
from django.utils import timezone
from account.models import User


class Specification(models.Model):
    name = models.CharField(max_length=255, unique=True)


class ExtraData(models.Model):
    data = models.JSONField()


class Assignment(models.Model):
    user = models.ForeignKey(User,related_name="user", on_delete=models.DO_NOTHING)
    data = models.OneToOneField(ExtraData, on_delete=models.DO_NOTHING, blank=True)
    date = models.DateTimeField(default=timezone.now())
    specification = models.ForeignKey(
        Specification, on_delete=models.DO_NOTHING)
    creator = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="creator")
    name = models.CharField(max_length=128)
    text = models.TextField(max_length=2048)
