from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from .models import Vehicle
from .serializers import VehicleSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from django.http import JsonResponse

class VehicleViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]
    queryset = Vehicle.objects.all()
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def list(self, request, *args, **kwargs):
        if request.body:
            return Response({
                "detail": "Get Requests should not have a body."
            },
                status=status.HTTP_400_BAD_REQUEST)
        
        return super().list(request, *args, **kwargs)
        
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get(self, request, *args, **kwargs):
        if request.body:
            return Response({
                "detail": "Get Requests should not have a body."
            },
                status=status.HTTP_400_BAD_REQUEST)
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
def hello_world(request):
    return JsonResponse({
        'message': 'Hello, World!'
    })