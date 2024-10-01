# vehicles/tests/test_user_api.py
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse

class UserAPITestCase(APITestCase):

    def setUp(self):
        # URL de la API de usuarios
        self.url = reverse('user-list-create')

        # Datos del usuario de prueba
        self.user_data = {
            'username': 'testuser2',
            'password': 'testpassword2'
        }

    def test_create_user(self):
        """Prueba para crear un usuario"""
        response = self.client.post(self.url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser2')

    def test_list_users(self):
        """Prueba para listar usuarios"""
        # Crear dos usuarios
        User.objects.create_user(username='user1', password='pass1')
        User.objects.create_user(username='user2', password='pass2')

        # Hacer una solicitud GET
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_retrieve_user(self):
        """Prueba para obtener detalles de un usuario"""
        user = User.objects.create_user(username='user3', password='pass3')
        url = reverse('user-detail', kwargs={'pk': user.pk})

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'user3')

    def test_update_user(self):
        """Prueba para actualizar un usuario"""
        user = User.objects.create_user(username='user4', password='pass4')
        url = reverse('user-detail', kwargs={'pk': user.pk})

        # Datos actualizados
        updated_data = {'username': 'updateduser4', 'password': 'newpassword4'}

        # Hacer una solicitud PUT
        response = self.client.put(url, updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verificar si los datos fueron actualizados
        user.refresh_from_db()
        self.assertEqual(user.username, 'updateduser4')

    def test_delete_user(self):
        """Prueba para eliminar un usuario"""
        user = User.objects.create_user(username='user5', password='pass5')
        url = reverse('user-detail', kwargs={'pk': user.pk})

        # Hacer una solicitud DELETE
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Verificar si el usuario fue eliminado
        self.assertEqual(User.objects.count(), 0)
