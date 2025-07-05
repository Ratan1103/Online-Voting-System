from rest_framework import serializers
from .models import CustomUser

class VoterRegistrationSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)

    class Meta:
        model=CustomUser
        fields=['id','username','email','password','age','gender','region','is_voter','is_verified']
        extra_kwargs={
            'password':{'write_only':True}
        }
    
    def create(self,validated_data):
        user=CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            age=validated_data['age'],
            gender=validated_data['gender'],
            region=validated_data['region'],
        )
        user.is_voter=True
        user.is_verified=None
        user.save()
        return user
