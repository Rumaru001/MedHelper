from django_filters import FilterSet
from .models import Doctor

class DoctorFilter(FilterSet):
    class Meta:
        model = Doctor
        fields = ['name','surname','contact_number','sex','patients']