# Generated by Django 3.1.3 on 2020-11-12 23:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_auto_20201112_2341'),
    ]

    operations = [
        migrations.AlterField(
            model_name='baseuser',
            name='user_status',
            field=models.CharField(choices=[(1000, 'admin'), (1, 'patient'), (2, 'doctor')], max_length=20),
        ),
    ]
