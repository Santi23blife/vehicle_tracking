# vehicles/tests/test_vehicle_api.py
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from vehicles.models import Vehicle

class VehicleAPITestCase(APITestCase):

    def setUp(self):
        # Crear un usuario para autenticación
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Obtener el token de acceso para este usuario
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        # Establecer el encabezado de autorización
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

        # URL de la API de vehículos
        self.url = reverse('vehicle-list')

        # Crear un vehículo de ejemplo
        self.vehicle_data = {
            'license_plate': 'XYZ123',
            'last_latitude': 19.4326,
            'last_longitude': -99.1332
        }

    def test_create_vehicle(self):
        """Prueba para crear un vehículo"""
        response = self.client.post(self.url, self.vehicle_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Vehicle.objects.count(), 1)
        self.assertEqual(Vehicle.objects.get().license_plate, 'XYZ123')

    def test_list_vehicles(self):
        """Prueba para listar vehículos"""
        # Crear dos vehículos
        Vehicle.objects.create(user=self.user, license_plate='ABC123', last_latitude=19.0, last_longitude=-99.0)
        Vehicle.objects.create(user=self.user, license_plate='DEF456', last_latitude=20.0, last_longitude=-100.0)

        # Hacer una solicitud GET
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_retrieve_vehicle(self):
        """Prueba para obtener detalles de un vehículo"""
        vehicle = Vehicle.objects.create(user=self.user, license_plate='GHI789', last_latitude=21.0, last_longitude=-101.0)
        url = reverse('vehicle-detail', kwargs={'pk': vehicle.pk})

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['license_plate'], 'GHI789')

    def test_update_vehicle(self):
        """Prueba para actualizar un vehículo"""
        vehicle = Vehicle.objects.create(user=self.user, license_plate='JKL012', last_latitude=22.0, last_longitude=-102.0)
        url = reverse('vehicle-detail', kwargs={'pk': vehicle.pk})

        # Datos actualizados
        updated_data = {'license_plate': 'MNO345', 'last_latitude': 23.0, 'last_longitude': -103.0}

        # Hacer una solicitud PUT
        response = self.client.put(url, updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verificar si los datos fueron actualizados
        vehicle.refresh_from_db()
        self.assertEqual(vehicle.license_plate, 'MNO345')

    def test_delete_vehicle(self):
        """Prueba para eliminar un vehículo"""
        vehicle = Vehicle.objects.create(user=self.user, license_plate='PQR678', last_latitude=24.0, last_longitude=-104.0)
        url = reverse('vehicle-detail', kwargs={'pk': vehicle.pk})

        # Hacer una solicitud DELETE
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Verificar si el vehículo fue eliminado
        self.assertEqual(Vehicle.objects.count(), 0)
