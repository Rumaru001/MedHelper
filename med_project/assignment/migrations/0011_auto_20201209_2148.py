# Generated by Django 3.1.3 on 2020-12-09 21:48

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('assignment', '0010_auto_20201208_1513'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assignment',
            name='date',
        ),
        migrations.AddField(
            model_name='assignment',
            name='create_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='assignment',
            name='editing_date',
            field=models.DateTimeField(default=datetime.datetime(2020, 12, 9, 21, 48, 40, 844913, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='assignment',
            name='tag',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='tags', to='assignment.tag'),
        ),
    ]
