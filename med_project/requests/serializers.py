from rest_framework import fields, serializers
from .models import Request


class RequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Request
        fields = "__all__"
