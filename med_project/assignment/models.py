from django.db import models


class Specification(models.Model):
    name = models.CharField(max_length=255, unique=True)


class ExtraData(models.Model):
    data = models.JSONField()


class Assignment(models.Model):
    user_id = models.IntegerField()
    data = models.OneToOneRel(ExtraData)
    date = models.DateField()
    specification = models.ManyToOneRel(Specification)
    creator_id = models.IntegerField()
    name = models.CharField(max_length=128)
    text = models.TextField(max_length=2048)
