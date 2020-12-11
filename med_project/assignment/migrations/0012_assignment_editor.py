# Generated by Django 3.1.3 on 2020-12-09 21:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('assignment', '0011_auto_20201209_2148'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='editor',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.DO_NOTHING, related_name='modificated_assignments', to='account.user'),
            preserve_default=False,
        ),
    ]
