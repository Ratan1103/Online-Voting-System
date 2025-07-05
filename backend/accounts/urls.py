from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import VoterRegisterView,unverified_voters,verify_voter,PendingVoterListView,VoterVerificationView

urlpatterns=[
    path('login/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('register/',VoterRegisterView.as_view(),name='voter-register'),
    path('unverified/',unverified_voters,name='unverified-voters'),
    path('pending-voters/',PendingVoterListView.as_view(),name='pending-voters'),
    path('verify-voter/<int:voter_id>',VoterVerificationView.as_view(),name='voter-verification'),
    path('verify/<int:user_id>/',verify_voter,name='verify-voter'),
    path('admin/voters/<int:pk>/verify/', verify_voter),
]