from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import VoterRegistrationSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated


class VoterRegisterView(APIView):
    def post(self,request):
        serializer=VoterRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Voter registered successfully . Awaiting Admin Verification"},status=status.HTTP_201_CREATED)
        print("error",serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
# Create your views here.
@api_view(['GET'])
@permission_classes([IsAdminUser])
def unverified_voters(request):
    unverified = CustomUser.objects.filter(is_voter=True, is_verified=False)
    serializer = VoterRegistrationSerializer(unverified, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def verify_voter(request, pk):
    try:
        voter = CustomUser.objects.get(pk=pk, is_staff=False)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Voter not found'}, status=404)

    is_verified = request.data.get('is_verified')

    # Normalize string "true"/"false" to boolean
    if isinstance(is_verified, str):
        is_verified = is_verified.lower() == "true"

    if isinstance(is_verified, bool):
        voter.is_verified = is_verified
    else:
        return Response({'error': 'Invalid action'}, status=400)

    voter.save()
    return Response({'message': 'Voter status updated'}, status=200)

class PendingVoterListView(ListAPIView):
    queryset = CustomUser.objects.filter(is_voter=True, is_verified=False)
    serializer_class = VoterRegistrationSerializer
    permission_classes = [IsAdminUser]

class VoterVerificationView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, voter_id):
        action = request.data.get("action")
        voter = get_object_or_404(CustomUser, id=voter_id, is_voter=True)

        if action == "approve":
            voter.is_verified = True
        elif action == "reject":
            voter.is_verified = False
        else:
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        voter.save()
        return Response({"message": f"Voter has been {action}d successfully"})
    
class VoterListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        voters = CustomUser.objects.filter(is_voter=True)
        serializer = VoterRegistrationSerializer(voters, many=True)
        return Response(serializer.data)

class VoterVerifyRejectView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        is_verified = request.data.get("is_verified")

        # Convert string to boolean if needed
        if isinstance(is_verified, str):
            is_verified = is_verified.lower() == "true"

        if isinstance(is_verified, bool):
            try:
                voter = CustomUser.objects.get(pk=pk, is_voter=True)
            except CustomUser.DoesNotExist:
                return Response({"error": "Voter not found"}, status=status.HTTP_404_NOT_FOUND)

            voter.is_verified = is_verified
            voter.save()

            return Response({
                "message": f"Voter {'verified' if is_verified else 'rejected'} successfully."
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
