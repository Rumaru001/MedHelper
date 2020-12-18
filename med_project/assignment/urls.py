from django.urls import path
from .views import *


urlpatterns = [path('', AssignmentsListView.as_view()),
               path('<int:pk>', AssignmentView.as_view()),
               path('last', LastAssignment.as_view()),
               path('create', AssignmentView.as_view()),
               path('update/<int:pk>', AssignmentView.as_view()),
               path('delete/<int:pk>', AssignmentView.as_view()),
               path('specification', SpeceficatiomListView.as_view()),
               path('specification/create', SpecificationView.as_view()),
               path('specification/<int:pk>', SpecificationView.as_view()),
               path('specification/update/<int:pk>',
                    SpecificationView.as_view()),
               path('tag', TagListView.as_view()),
               path('tag/create',
                    TagView.as_view()),
               path('tag/<int:pk>',
                    TagView.as_view()),
               path('tag/update/<int:pk>',
                    TagView.as_view()),
               path('tag/delete/<int:pk>',
                    TagView.as_view()),
               ]
