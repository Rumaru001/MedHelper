# Generated by Django 3.1.3 on 2020-12-08 15:13

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('assignment', '0009_auto_20201208_1501'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2020, 12, 8, 15, 13, 29, 588079, tzinfo=utc)),
        ),
    ]
