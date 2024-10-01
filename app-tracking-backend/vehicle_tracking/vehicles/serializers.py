from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Vehicle
class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [ 'id', 'license_plate', 'last_latitude', 'last_longitude' ]
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        
    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user