from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Doctor, Profile, User


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        print("created1")
        if instance.user_type == User.USER_TYPE_CHOICES[2][0]:
            Doctor.objects.create(user=instance)
            print("created1.1")
        elif instance.user_type == User.USER_TYPE_CHOICES[1][0]:
            Profile.objects.create(user=instance)
            print("created1.2")


@receiver(post_save, sender=User)
def update_profile(sender, instance, created, **kwargs):
    if created == False:
        print("created NOT")
        if instance.user_type == User.USER_TYPE_CHOICES[2][0]:
            instance.doctor_profile.save()
            print("created NOT 1")
        elif instance.user_type == User.USER_TYPE_CHOICES[1][0]:
            instance.profile.save()
