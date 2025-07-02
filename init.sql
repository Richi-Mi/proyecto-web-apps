CREATE DATABASE alumnos;
USE alumnos;

CREATE TABLE administrador (
    username varchar(16),
    correo VARCHAR(32) UNIQUE,
    password VARCHAR(32)
);

create table examen (
    fecha date,
    lab SERIAL PRIMARY KEY,
    hora TINYINT
);

create table alumno (
    boleta varchar(10) PRIMARY KEY,
    nombre varchar(64),
    telefono BIGINT,
    curp VARCHAR(18),
    entidad VARCHAR(32),
    genero BOOLEAN,
    fecha date,
    escuela VARCHAR(32),
    promedio FLOAT,
    correo VARCHAR(32),
    password VARCHAR(32),
    data_examen int,

    Foreign Key (data_examen) REFERENCES examen (lab)   
);