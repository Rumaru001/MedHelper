from rest_framework import serializers
from .models import Specification, Assignment, ExtraData
from rest_framework.permissions import BasePermission

# to delete
class IsOwner(BasePermission):
    def has_permission(self, request, view):
        pass

    def has_object_permission(self, request, view, obj):
        return obj.user_id == request.user.id


class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = "__all__"

    def create(self, validated_data):
        return Specification.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        return instance


class ExtraDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraData
        fields = "__all__"

    def create(self, validated_data):
        return ExtraData.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.data = validated_data.get("data", instance.data)
        instance.save()
        return instance


class AssignmentSerializer(serializers.ModelSerializer):
    data = ExtraDataSerializer()
    specification = SpecificationSerializer()

    class Meta:
        model = Assignment
        fields = "__all__"

    def create(self, validated_data):
        extraData = validated_data.pop("data")
        data = ExtraData.objects.create(**extraData)
        specificationData = validated_data.pop("specification")
        specification = Specification.objects.create(**specificationData)
        return Assignment.objects.create(data=data, specification=specification, **validated_data)


    def update(self, instance, validated_data):
        instance.user_id = validated_data.get("user_id", instance.user_id)
        instance.data = ExtraData.objects.create(**validated_data.pop("data"))
        instance.date = validated_data.get("date", instance.date)
        instance.specification = Specification.objects.create(**validated_data.pop("specification"))
        instance.creator_id = validated_data.get("creator_id", instance.creator_id)
        instance.name = validated_data.get("name", instance.name)
        instance.text = validated_data.get("text", instance.text)
        instance.save()
