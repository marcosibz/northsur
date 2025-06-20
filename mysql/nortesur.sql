
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS nortesur;
USE nortesur;

-- 1. Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('cliente', 'jefe_ventas') NOT NULL,
    fecha_alta DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    codigo_producto VARCHAR(20) NOT NULL UNIQUE,
    descripcion TEXT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- 3. Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    estado ENUM('pendiente', 'entregado', 'anulado') DEFAULT 'pendiente',
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- 4. Tabla de detalle_pedidos
CREATE TABLE IF NOT EXISTS detalle_pedidos (
    id_detalle INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- 5. Tabla de historial_pedidos
CREATE TABLE IF NOT EXISTS historial_pedidos (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    fecha_estado DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado_final ENUM('entregado', 'anulado') NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE
);

-- 6. Tabla de correos_internos
CREATE TABLE IF NOT EXISTS correos_internos (
    id_correo INT PRIMARY KEY AUTO_INCREMENT,
    departamento VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL
);

-- 7. Tabla de pagos
CREATE TABLE IF NOT EXISTS pagos (
    id_pago INT PRIMARY KEY AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    medio_pago VARCHAR(100) NOT NULL,
    estado_pago ENUM('pendiente', 'aprobado', 'fallido') DEFAULT 'pendiente',
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE
);

-- Datos de ejemplo para usuarios
INSERT INTO usuarios (nombre, apellido, email, contraseña, tipo_usuario) VALUES
('Marcos', 'Ibañez', 'marcos@gmail.com', '1234', 'cliente'),
('Jefe', 'Ventas', 'jefe@empresa.com', 'admin123', 'jefe_ventas');

-- Datos de ejemplo para productos
INSERT INTO productos (codigo_producto, descripcion, precio_unitario) VALUES
('ARG001', 'Viaje a Cataratas del Iguazú', 150000.00),
('INT001', 'Viaje a París', 450000.00);

-- Datos de ejemplo para pedidos
INSERT INTO pedidos (id_usuario, estado, total) VALUES
(1, 'pendiente', 150000.00);
