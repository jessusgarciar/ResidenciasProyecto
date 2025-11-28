1- RESIDENCIAS BETA V1: 

## Descripción General

Este proyecto es una **aplicación web de gestión académica** desarrollada con Node.js y Express.js. El sistema permite administrar información relacionada con alumnos, asesores y empresas, probablemente orientado a la gestión de prácticas profesionales o vinculación empresarial en una institución educativa.

## Objetivo del Proyecto

El proyecto tiene como objetivo proporcionar una plataforma centralizada para:

- Gestionar información de alumnos
- Administrar datos de asesores académicos
- Mantener un registro de empresas
- Facilitar procesos mediante formularios
- Generar reportes en PDF
- Controlar el acceso mediante un sistema de login

## Tecnologías Utilizadas

### Backend

- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor
- **Express.js**: Framework web para Node.js (identificado en src/index.js)
- **Base de Datos SQL**: Sistema de gestión de datos (configurado en src/database.js)

### Frontend

- **Handlebars (HBS)**: Motor de plantillas para generar vistas HTML dinámicas
    - Layout principal: views/layouts/main.hbs
    - Componentes reutilizables: views/partials/navigation.hbs
- **CSS**: Estilos personalizados en [style.css]
- **JavaScript del cliente**: Lógica frontend en [app.js]

## Librerías y Dependencias

### Librerías de Frontend

- **jsPDF**: Librería para generar documentos PDF desde el navegador (src/public/js/jspdf.min.js)

### Dependencias del Proyecto

Las dependencias exactas se encuentran definidas en [package.json].

## Estructura del Proyecto

### Módulos Principales

1. **Sistema de Autenticación**
    
    - Rutas: [login.routes.js]
    - Vista: [login.hbs]
2. **Gestión de Alumnos**
    
    - Rutas: [alumnos.routes.js]
    - Vista: [alumnos.hbs]
3. **Gestión de Asesores**
    
    - Rutas: [asesores.routes.js]
    - Vista: [asesores.hbs]
    
    - Rutas: [empresas.routes.js]
    - Vistas:
        - Listado: [empresas.hbs]
        - Agregar: [addempresa.hbs]
        - Editar: [editempresa.hbs]
5. **Sistema de Formularios**
    
    - Rutas: [form.routes.js]
    - Vista: [form.hbs]

### Capa de Datos

- **Archivo de configuración**: [database.js]
- **Consultas SQL**: [query.sql]

### Punto de Entrada

- **Servidor principal**: [index.js]

## Funcionalidades

1. **CRUD Completo**: Crear, leer, actualizar y eliminar registros de alumnos, asesores y empresas
2. **Autenticación**: Sistema de login para controlar el acceso
3. **Generación de Reportes**: Exportación de información a PDF mediante jsPDF
4. **Interfaz Responsive**: Diseño adaptable mediante CSS
5. **Navegación Modular**: Componente de navegación reutilizable

## Configuración del Entorno

- **Configuración de VS Code**: [settings.json]
- **Gestión de Paquetes**: [package.json]

## Recursos Estáticos

Los recursos públicos se organizan en:

- **Estilos**: [css]
- **Scripts**: [js]
- **Imágenes**: [img]

## Arquitectura

El proyecto sigue el patrón **MVC (Modelo-Vista-Controlador)**:

- **Modelos**: Consultas SQL en [query.sql]
- **Vistas**: Plantillas Handlebars en [views]
- **Controladores**: Rutas en [routes]
