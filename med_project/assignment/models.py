from django.db import models
from django.db.models.fields.related import ForeignKey
from django.utils import timezone
from account.models import User


class Specification(models.Model):
    name = models.CharField(max_length=255, unique=True)


class ExtraData(models.Model):
    data = models.JSONField()


class Tag(models.Model):

    user = ForeignKey(User, related_name="tags",
                      on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=50)


class Assignment(models.Model):

    user = models.ForeignKey(User, related_name="assignments",
                             on_delete=models.CASCADE)

    tag = models.ForeignKey(Tag, related_name="tags",
                            on_delete=models.SET_NULL, blank=True, null=True)
    data = models.OneToOneField(
        ExtraData, on_delete=models.DO_NOTHING, blank=True)
    create_date = models.DateTimeField(auto_now_add=True)

    specification = models.ForeignKey(
        Specification, on_delete=models.SET_NULL, null=True)

    creator = models.ForeignKey(
        User, on_delete=models.DO_NOTHING)

    name = models.CharField(max_length=128)
    text = models.TextField(max_length=2048)

    editing_date = models.DateTimeField()
    editor = models.ForeignKey(User, related_name="modificated_assignments",
                               on_delete=models.DO_NOTHING)

    def save(self, *args, **kwargs):
        self.editing_date = timezone.now()
        return super(Assignment, self).save(*args, **kwargs)
