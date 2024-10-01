
# Documentación de la Aplicación de Rastreo de Vehículos

## Descripción del Proyecto
Esta aplicación permite administrar una flotilla de vehículos, donde cada vehículo tiene información como su ID, placas y última posición conocida (lat, lon). Los usuarios pueden interactuar únicamente con los vehículos que han creado.

## Tecnologías Usadas
- Django
- Django REST Framework
- SQLite (base de datos por defecto)
- Python
- JWT para autenticación

## Estructura del Proyecto
```
engineering-project/
├── vehicles/                   # Aplicación Django para la gestión de vehículos
│   ├── migrations/             # Migraciones de la base de datos
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py               # Modelos de datos (User, Vehicle)
│   ├── serializers.py          # Serializadores para los modelos
│   ├── tests/                  # Pruebas unitarias
│   └── views.py                # Vistas de la API
├── engineering_project/        # Proyecto Django principal
│   ├── __init__.py
│   ├── settings.py             # Configuraciones de la aplicación
│   ├── urls.py                 # Rutas del proyecto
│   └── wsgi.py
├── manage.py                   # Script para administrar el proyecto
└── requirements.txt            # Dependencias del proyecto
```

## Rutas de la API

### Usuarios

- **Crear un usuario**
  - **Método:** POST
  - **Endpoint:** `/api/users/`
  - **Body:** 
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```
  - **Respuesta:** 
    - `201 Created` si el usuario es creado.
  
- **Listar usuarios**
  - **Método:** GET
  - **Endpoint:** `/api/users/`
  - **Respuesta:**
    - `200 OK` con una lista de usuarios.

- **Obtener usuario por ID**
  - **Método:** GET
  - **Endpoint:** `/api/users/<id>/`
  - **Respuesta:** 
    - `200 OK` con los detalles del usuario.

- **Actualizar usuario**
  - **Método:** PUT
  - **Endpoint:** `/api/users/<id>/`
  - **Body:**
    ```json
    {
      "username": "updateduser",
      "password": "newpassword"
    }
    ```
  - **Respuesta:**
    - `200 OK` si la actualización es exitosa.

- **Eliminar usuario**
  - **Método:** DELETE
  - **Endpoint:** `/api/users/<id>/`
  - **Respuesta:**
    - `204 No Content` si el usuario es eliminado.

### Vehículos

- **Crear un vehículo**
  - **Método:** POST
  - **Endpoint:** `/api/vehicles/`
  - **Body:**
    ```json
    {
      "license_plate": "XYZ123",
      "last_latitude": 19.4326,
      "last_longitude": -99.1332
    }
    ```
  - **Respuesta:**
    - `201 Created` si el vehículo es creado.

- **Listar vehículos**
  - **Método:** GET
  - **Endpoint:** `/api/vehicles/`
  - **Respuesta:**
    - `200 OK` con una lista de vehículos del usuario autenticado.

- **Obtener vehículo por ID**
  - **Método:** GET
  - **Endpoint:** `/api/vehicles/<id>/`
  - **Respuesta:**
    - `200 OK` con los detalles del vehículo.

- **Actualizar vehículo**
  - **Método:** PUT
  - **Endpoint:** `/api/vehicles/<id>/`
  - **Body:**
    ```json
    {
      "license_plate": "ABC456",
      "last_latitude": 20.0,
      "last_longitude": -100.0
    }
    ```
  - **Respuesta:**
    - `200 OK` si la actualización es exitosa.

- **Eliminar vehículo**
  - **Método:** DELETE
  - **Endpoint:** `/api/vehicles/<id>/`
  - **Respuesta:**
    - `204 No Content` si el vehículo es eliminado.

## Configuraciones Importantes

- **SECRET_KEY:** Mantener en un archivo `.env` para no exponerla en el repositorio.
- **DEBUG:** Asegúrate de configurar esto en `False` en producción.
- **ALLOWED_HOSTS:** Configurar dominios permitidos para la aplicación.

## Ejecución Local

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd engineering-project
   ```

2. Crea un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Linux/Mac
   venv\Scriptsctivate  # En Windows
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Ejecuta las migraciones:
   ```bash
   python manage.py migrate
   ```

5. Levanta el servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```

## Pruebas Unitarias

Las pruebas se encuentran en el directorio `vehicles/tests/`. Puedes ejecutarlas con:

```bash
python manage.py test vehicles
```

## Despliegue en EC2

1. **Crear una instancia EC2.**
2. **Configurar la seguridad para permitir tráfico HTTP.**
3. **Clonar el repositorio en la instancia.**
4. **Instalar dependencias y levantar el servidor.**
5. **Asegurarte de que el dominio está en ALLOWED_HOSTS.**
