# accounts/admin_urls.py

from django.urls import path
from .views import VoterListView, VoterVerifyRejectView

urlpatterns = [
    path('voters/', VoterListView.as_view(), name='voter-list'),
    path('voters/<int:pk>/verify/', VoterVerifyRejectView.as_view(), name='voter-verify'),
]
