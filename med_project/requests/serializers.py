from rest_framework import fields, serializers
from .models import Request
from .request_actions import RequestType


class RequestSerializer(serializers.ModelSerializer):
    description = serializers.SerializerMethodField()

    class Meta:
        model = Request
        fields = "__all__"

    def get_description(self, obj):
        return RequestType[Request.Request_Type(obj.type).name].value.get_description(obj.sender)
