# Registro de Eventos

Esta es una aplicación web full-stack diseñada para gestionar el registro de participantes en eventos. Cuenta con un backend desarrollado en Python utilizando FastAPI y un frontend moderno creado con React y Vite.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- **`backend/`**: Contiene la API REST desarrollada con FastAPI. Utiliza SQLAlchemy como ORM y una base de datos SQLite (`participantes.db`) para almacenar la información de los usuarios registrados.
- **`frontend/`**: Contiene la interfaz de usuario desarrollada en React con TypeScript. Utiliza Vite como empaquetador, Tailwind CSS para los estilos y maneja el estado global mediante React Context.

---

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu computadora:

- [Python 3.8 o superior](https://www.python.org/downloads/) (para el backend)
- [Node.js y npm](https://nodejs.org/) (para el frontend)

---

## ¿Cómo ejecutar el proyecto?

Para ejecutar la aplicación correctamente, es necesario inicializar tanto el servidor backend como el servidor de desarrollo del frontend en terminales separadas.

### 1. Iniciar el Backend (FastAPI)

Abre una terminal y dirígete a la carpeta del proyecto. Luego sigue estos pasos:

1. Navega a la carpeta del backend:
   ```bash
   cd registro-eventos/backend
   ```
2. Activa el entorno virtual (si estás en Windows):
   ```bash
   .\venv\Scripts\activate
   ```
   *(Nota: Si usas Linux o macOS, el comando sería `source venv/bin/activate`)*
3. Inicia el servidor de Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

El backend estará disponible y escuchando peticiones en **http://localhost:8000**.
Puedes ver la documentación interactiva de la API (Swagger UI) ingresando a **http://localhost:8000/docs**.

### 2. Iniciar el Frontend (React + Vite)

Abre una segunda terminal y sigue estos pasos:

1. Navega a la carpeta del frontend:
   ```bash
   cd registro-eventos/frontend
   ```
2. Instala las dependencias (solo es necesario la primera vez o si se agregan nuevas librerías):
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El frontend estará corriendo y podrás acceder a la aplicación desde tu navegador, generalmente en **http://localhost:5173** (la consola de Vite indicará el puerto exacto).

---

## Tecnologías Utilizadas

**Backend:**
- Python
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Context API
