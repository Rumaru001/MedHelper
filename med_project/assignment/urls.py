from django.urls import path
from .views import *


urlpatterns = [path('/',AssignmentsListView.as_view()),
               path('/<int:pk>',AssignmentsDetailView.as_view()),
               path('/update/<int:pk>',AssignmentUpdateView.as_view()),
               path('/delete/<int:pk>',AssignmentDeleteView.as_view()),
               path('specification/',SpeceficatiomListView.as_view()),
               path('specification/update/<int:pk>',SpecificationUpdateView.as_view()),
               path('specification/delete/<int:pk>',SpecificatiomDeleteView.as_view())
               ]