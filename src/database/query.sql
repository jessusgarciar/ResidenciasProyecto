CREATE DATABASE residencias;

USE residencias;

CREATE TABLE asesores (
    rfc VARCHAR(13) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    atencion_a VARCHAR(100),
    giro_sector VARCHAR(100),
    domicilio TEXT,
    colonia VARCHAR(100),
    ciudad VARCHAR(100),
    mision TEXT,
    codigo_postal VARCHAR(10),
    titular_nombre VARCHAR(100),
    titular_puesto VARCHAR(100),
    firmante_nombre VARCHAR(100),
    firmante_puesto VARCHAR(100),
    empresa_sector ENUM('INDUSTRIAL', 'SERVICIOS', 'OTRO', 'PUBLICO', 'PRIVADO') NOT NULL,
    rfc_empresa VARCHAR(20) NOT NULL,
    telefono_empresa VARCHAR(12) NOT NULL,
);

CREATE TABLE alumnos (
    num_control VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    carrera VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    rfc_asesor VARCHAR(13),
    periodo BOOLEAN, -- true = Ene-Jun, false = Ago-Dic
    institucion_salud ENUM('IMSS', 'ISSSTE', 'OTRO') NOT NULL,
    num_seguro_social VARCHAR(20),
    comentario_ciudad TEXT,
    domicilio VARCHAR(100) NOT NULL,
    email_alumno VARCHAR(50) NOT NULL,

    FOREIGN KEY (rfc_asesor) REFERENCES asesores(rfc)
);

CREATE TABLE residencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_proyecto VARCHAR(255) NOT NULL,
    publica BOOLEAN NOT NULL, -- TRUE = pública, FALSE = privada
    giro VARCHAR(100),
    num_alumnos TINYINT NOT NULL CHECK (num_alumnos BETWEEN 1 AND 3),

    num_control VARCHAR(10) NOT NULL,
    empresa_id INT NOT NULL,

    FOREIGN KEY (num_control) REFERENCES alumnos(num_control) ON DELETE CASCADE,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

CREATE TABLE solicitudes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num_control VARCHAR(10) NOT NULL,
    residencia_id INT NOT NULL,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estatus ENUM('pendiente', 'aprobada', 'rechazada') DEFAULT 'pendiente',

    -- Datos del proyecto
    nombre_proyecto VARCHAR(255) NOT NULL,
    nombre_asesor_externo VARCHAR(100),
    puesto_asesor_externo VARCHAR(100),

    -- Datos del residente
    domicilio TEXT NOT NULL,
    email VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    telefono_fijo VARCHAR(15) NOT NULL,

    -- Selección de información
    coord_carrera VARCHAR(100) NOT NULL,
    numero_residentes TINYINT NOT NULL CHECK (numero_residentes BETWEEN 1 AND 3),
    opcion_elegida ENUM('banco de proyectos', 'propuesta propia', 'trabajador') NOT NULL,
    periodo ENUM('Enero-Junio', 'Agosto-Diciembre') NOT NULL,
    anio INT NOT NULL,
    empresa_id INT NOT NULL,

    FOREIGN KEY (num_control) REFERENCES alumnos(num_control) ON DELETE CASCADE,
    FOREIGN KEY (residencia_id) REFERENCES residencias(id) ON DELETE CASCADE,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'alumno') NOT NULL,
    num_control VARCHAR(10),

    FOREIGN KEY (num_control) REFERENCES alumnos(num_control) ON DELETE CASCADE
);

CREATE TABLE carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    coordinador VARCHAR(100) NOT NULL,
);