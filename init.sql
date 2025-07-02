CREATE DATABASE alumnos;
USE alumnos;

CREATE TABLE administrador (
    username VARCHAR(16),
    correo VARCHAR(32) UNIQUE,
    password VARCHAR(32)
);

CREATE TABLE examen (
    fecha DATE,
    lab INT AUTO_INCREMENT PRIMARY KEY,
    hora TINYINT
);

CREATE TABLE alumno (
    boleta VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(64),
    telefono BIGINT,
    curp VARCHAR(18),
    entidad VARCHAR(32),
    genero BOOLEAN,
    fecha DATE,
    escuela VARCHAR(32),
    promedio FLOAT,
    correo VARCHAR(32),
    password VARCHAR(32),
    data_examen INT,
    FOREIGN KEY (data_examen) REFERENCES examen (lab)
);
