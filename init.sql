create database alumnos;
use alumnos;
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
create table administrador (
    username varchar(16),
    correo UNIQUE VARCHAR(32),
    password VARCHAR(32)
);
create table examen (
    fecha date,
    lab SERIAL PRIMARY KEY,
    hora TINYINT
);