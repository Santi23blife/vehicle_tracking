from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, UserListCreateView, UserDetailView

router = DefaultRouter()
router.register(r'vehicles', VehicleViewSet)

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name="user-list-create"),
    path('users/<int:pk>/', UserDetailView.as_view(), name="user-detail"),
    path('', include(router.urls))
]