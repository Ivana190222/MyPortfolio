# Mi Portfolio CV-Instagram

Este proyecto es un portfolio personal con estilo inspirado en Instagram que muestra mi experiencia profesional, proyectos y habilidades de una manera visual e interactiva.

## Tecnologías Utilizadas

### Frontend
- **React**: Framework principal para la interfaz de usuario
- **Material-UI**: Biblioteca de componentes para el diseño y la interfaz
- **Bootstrap & Tailwind CSS**: Utilizados para estilos adicionales y diseño responsive
- **React Router**: Para la navegación entre páginas
- **React-PDF**: Para la generación de currículum en formato PDF
- **Axios**: Para las peticiones HTTP a la API

### Backend
- **Node.js & Express**: Para crear la API RESTful que gestiona los datos
- **MySQL**: Base de datos relacional para almacenar la información
- **Dotenv**: Gestión de variables de entorno
- **CORS**: Para habilitar las peticiones desde el frontend

## Características Principales

- **Diseño Inspirado en Instagram**: Interfaz similar a Instagram para mostrar proyectos y experiencia
- **Modo Híbrido**: Funciona tanto con base de datos MySQL como con datos locales (respaldo)
- **Sistema de Likes y Comentarios**: Los visitantes pueden interactuar con los proyectos
- **Visualización de Proyectos**: Muestra detalles, imágenes y enlaces a repositorios
- **Secciones Destacadas**: Presenta habilidades clave y certificaciones en un área especial
- **Exportación de CV**: Permite descargar el currículum en formato PDF

## Arquitectura

El proyecto sigue una arquitectura cliente-servidor:

1. **Frontend (React)**: Se comunica con el backend a través de la API REST
2. **Backend (Express)**: Procesa las peticiones y se comunica con la base de datos
3. **Base de datos (MySQL)**: Almacena toda la información del portfolio

## Funcionalidad en Diferentes Entornos

### En Desarrollo Local (con MySQL)
- El frontend se conecta al backend local
- El backend se conecta a la base de datos MySQL
- Todas las interacciones (likes, comentarios) se guardan en la base de datos

### En Netlify (sin MySQL)
- El frontend detecta automáticamente que está en Netlify
- El backend utiliza un sistema de almacenamiento en memoria para likes y comentarios
- Los datos iniciales se cargan desde un conjunto predefinido
- La funcionalidad completa sigue disponible, pero los cambios solo persisten durante la sesión

## Estructura de la Base de Datos

- **profile**: Información personal y profesional
- **posts**: Proyectos y experiencia laboral
- **post_comments**: Comentarios en los proyectos
- **post_likes**: Registro de likes en los proyectos
- **highlights**: Secciones destacadas (habilidades, certificaciones)
- **highlight_items**: Elementos individuales dentro de las secciones destacadas
- **followers**: Referencias profesionales y contactos

## Instalación y Ejecución

### Requisitos Previos
- Node.js (v14 o superior)
- MySQL (opcional, el sistema funciona sin base de datos en modo respaldo)

### Pasos para Instalación

1. Clonar el repositorio:
```
git clone [URL_DEL_REPOSITORIO]
cd MyPortfolio
```

2. Instalar dependencias:
```
npm install
```

3. Configurar MySQL (opcional):
   - Crear una base de datos llamada `cv_instagram`
   - Ejecutar el script SQL en `server/database.sql`
   - Crear un archivo `.env` con las credenciales:
   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=cv_instagram
   PORT=5002
   ```

4. Iniciar el servidor:
```
npm run server
```

5. En otra terminal, iniciar la aplicación React:
```
npm start
```

## Despliegue

### Frontend (Netlify)
1. Configurar las variables de entorno en Netlify
2. Conectar el repositorio a Netlify
3. Configurar el comando de build: `npm run build`
4. Configurar el directorio de publicación: `build`

### Backend (Servidor propio o servicio como Heroku)
1. Configurar las variables de entorno en el servidor
2. Instalar dependencias: `npm install`
3. Iniciar el servidor: `node server/index.js`

## Características Técnicas Destacadas

- **Sistema de Respaldo Automático**: Si la base de datos no está disponible, el sistema cambia automáticamente a usar datos estáticos
- **Detección de Entorno**: El sistema detecta si está en Netlify para ajustar su comportamiento
- **Almacenamiento en Memoria**: Para entornos sin acceso a base de datos, se implementa un sistema de almacenamiento en memoria
- **Interfaz Responsive**: Diseñada para verse bien en dispositivos móviles, tabletas y computadoras
- **Arquitectura Modular**: Componentes React reutilizables y API RESTful con endpoints bien definidos

## Notas para Desarrollo y Mantenimiento

- El sistema está diseñado para funcionar incluso cuando la base de datos no está disponible
- En Netlify, utiliza automáticamente el modo de respaldo
- Para añadir nuevos proyectos, se pueden editar los datos de respaldo en `server/index.js` 
- Los datos estáticos de respaldo se deben mantener sincronizados con la estructura de la base de datos

## Contacto

Para cualquier consulta o sugerencia, puedes contactarme a través de:
- Email: ivana.hervot@example.com
- LinkedIn: [Mi perfil de LinkedIn]
- GitHub: [Mi perfil de GitHub]


