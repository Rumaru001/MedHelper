from django_filters import FilterSet, fields, filters, CharFilter
from .models import Doctor, get_user_by_type


class DoctorFilter(FilterSet):
    # user doctors can be done throught https://django-filter.readthedocs.io/en/stable/ref/filters.html#method
    userDoctors = filters.BooleanFilter(
        field_name="userDoctors", method="filter_user_doctors")
    name = CharFilter(field_name="name", lookup_expr="contains")
    surname = CharFilter(field_name="surname", lookup_expr="contains")

    class Meta:
        model = Doctor
        fields = ['sex', 'name', 'surname']

    def filter_user_doctors(self, queryset, name, value):
        if value:
            queryset = queryset.filter(
                patients__in=[get_user_by_type(self.request.user)])
        return queryset
