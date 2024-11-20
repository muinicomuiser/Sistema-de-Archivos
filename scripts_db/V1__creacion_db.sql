-- Create database sistema_archivos;
use sistema_archivos;


-- ● Rut del Usuario.
-- ● Nombre original del archivo.
-- ● Nombre asignado (UUID).
-- ● Ruta de acceso al archivo en el servidor.
-- ● Fecha y hora de carga.

Create table documentos(
    rut varchar(12) not null,
    nombre_original varchar(255) not null,
    nombre_asignado varchar(255) not null,
    ruta_servidor varchar(255)  not null,
    fecha_hora timestamp not null
);