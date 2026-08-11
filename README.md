# Gestor de Biblioteca

Aplicación web para gestionar una biblioteca: usuarios, libros y préstamos. Proyecto desarrollado como práctica de bases de datos, usando Flask como backend y MongoDB como base de datos.

## Funcionalidades

- **Usuarios**: registrar, listar, actualizar y eliminar usuarios.
- **Libros**: registrar, listar, actualizar y eliminar libros (incluye datos como autor, editoriales, ISBN, género, etc.).
- **Préstamos**: registrar, listar, actualizar y eliminar préstamos, vinculando un libro con un usuario.

## Tecnologías usadas

- **Backend**: Python + Flask
- **Base de datos**: MongoDB (via PyMongo)
- **Frontend**: HTML, CSS y JavaScript (vanilla)

## Requisitos previos

- Python 3.9 o superior
- MongoDB corriendo localmente (`mongodb://localhost:27017/`)

## Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/BingusTobal/Proyecto-de-gestor-de-biblioteca.git
   cd Proyecto-de-gestor-de-biblioteca
   ```

2. Crear un entorno virtual (opcional pero recomendado):
   ```
   python -m venv venv
   source venv/bin/activate   # En Windows: venv\Scripts\activate
   ```

3. Instalar las dependencias:
   ```
   pip install -r requirements.txt
   ```

4. Asegurarse de tener MongoDB corriendo localmente.

## Uso

Ejecutar la aplicación:
```
python Visual.py
```

Por defecto se levanta en `http://127.0.0.1:5000/`. Desde ahí se puede navegar a:

- `/` — página de inicio
- `/usuarios` — gestión de usuarios
- `/libros` — gestión de libros
- `/prestamos` — gestión de préstamos

## Estructura del proyecto

```
├── Visual.py           # Backend Flask con la lógica y las rutas de la API
├── DATABASE/            # Scripts de ejemplo para poblar las colecciones de MongoDB
├── templates/           # Vistas HTML (Flask/Jinja)
├── static/               # CSS y JS del frontend
└── requirements.txt      # Dependencias del proyecto
```

## Notas

Este es un proyecto de estudio, desarrollado en el contexto de la carrera de Informatica, enfocado en practicar el uso de bases de datos no relacionales junto a un backend en Flask.
