# Generated by Django 3.1.3 on 2020-11-12 16:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20201112_1601'),
    ]

    operations = [
        migrations.RenameField(
            model_name='baseuser',
            old_name='surname',
            new_name='second_name',
        ),
    ]