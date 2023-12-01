DROP DATABASE IF EXISTS restaurante_db;

CREATE DATABASE IF NOT EXISTS restaurante_db;

USE restaurante_db;

CREATE TABLE IF NOT EXISTS mesero(
    mro_nue TINYINT unsigned auto_increment NOT NULL,
    mro_nombre VARCHAR(40) NOT NULL, 
    mro_honorarios DECIMAL(6,2), 
    mro_direccion VARCHAR(25) NOT NULL,
    mro_telefono VARCHAR(11) NOT NULL,
    mro_email VARCHAR(25) NULL,
    INDEX(mro_nue),
    INDEX(mro_nombre),
    UNIQUE(mro_telefono),
    UNIQUE(mro_email),
    UNIQUE(mro_nue),
    PRIMARY KEY (mro_nue) # Artificial porque es más común que se identifiquen por un número de empleado designado por la empresa
						  # y no por el número de registro según entraron a laborar.
);

CREATE TABLE IF NOT EXISTS mesa(
	mesa_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    mesa_capacidad TINYINT UNSIGNED NOT NULL,
	PRIMARY KEY (mesa_id) # Subrogada porque es la única manera de identificar un registro único
);


CREATE TABLE IF NOT EXISTS cliente(
    cli_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	cli_nombre VARCHAR(40),
    cli_direccion VARCHAR(40),
    cli_telefono VARCHAR(11),
    cli_mesa_id TINYINT UNSIGNED NOT NULL,
    INDEX(cli_nombre),
    UNIQUE(cli_telefono),
    PRIMARY KEY (cli_id),  # Subrogada porque tiene sentido para el sistema y puede que el cliente no desee otorgar datos
    CONSTRAINT fk_cli_mesa
		FOREIGN KEY (cli_mesa_id)
        REFERENCES mesa(mesa_id)
);


CREATE TABLE IF NOT EXISTS categoria(
	cat_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	cat_nombre VARCHAR(20) NOT NULL,
	INDEX(cat_nombre),
	PRIMARY KEY (cat_id) # Subrogada porque es la única manera de identificar un registro único
);



CREATE TABLE IF NOT EXISTS producto(
	prod_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, #Subrogada para llevar un control mejor y sencillo.
	prod_nombre VARCHAR(60) NOT NULL,
	prod_cat_id TINYINT UNSIGNED NOT NULL,
	prod_existencia TINYINT UNSIGNED,
	prod_precio DECIMAL(6,2) NOT NULL,
	INDEX(prod_cat_id),
	CONSTRAINT fk_categoria_producto
		FOREIGN KEY(prod_cat_id)
		REFERENCES categoria (cat_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS orden(
	ord_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	ord_mesa_id TINYINT UNSIGNED NOT NULL,
	ord_mro_nue TINYINT UNSIGNED NOT NULL,
	ord_fecha DATETIME NOT NULL,
	ord_estado ENUM('PAGADA', 'ABIERTA') NOT NULL,
	INDEX(ord_fecha),
	PRIMARY KEY (ord_id), # Subrogada porque es la única manera de identificar un registro único
	CONSTRAINT fk_mesa_orden
		FOREIGN KEY(ord_mesa_id)
        REFERENCES mesa (mesa_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	CONSTRAINT fk_mesero_orden
		FOREIGN KEY(ord_mro_nue)
        REFERENCES mesero ( mro_nue)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS factura(
	fac_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	fac_fecha DATETIME NOT NULL,
	fac_total DECIMAL(8,2) NULL,
	fac_ord_id SMALLINT UNSIGNED,
	INDEX(fac_fecha),
	PRIMARY KEY (fac_id), # Subrogada porque es la única manera de identificar un registro único
	CONSTRAINT fk_factura_orden
		FOREIGN KEY (fac_ord_id) 
		REFERENCES orden (ord_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS detallepedido(
	dp_prod_id INT NOT NULL,
	dp_ord_id SMALLINT UNSIGNED NOT NULL,
	dp_cantidadPedida TINYINT UNSIGNED NOT NULL,
	dp_especificaciones TEXT,
	PRIMARY KEY (dp_prod_id, dp_ord_id), # Subrogada compound de las llaves foráneas que llegan de las tablas producto y orden.
	CONSTRAINT fk_producto_detallepedido							 # ya que se trata de una tabla dependiente de ellas.
		FOREIGN KEY(dp_prod_id)
        REFERENCES producto(prod_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	CONSTRAINT fk_orden_dp
		FOREIGN KEY(dp_ord_id)
        REFERENCES orden (ord_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);					

INSERT INTO mesa(mesa_capacidad) VALUES(4),(4),(4),(8),(8),(6),(6);


							