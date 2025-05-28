use shop;

CREATE TABLE product (
	id INT AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    detail TEXT,
    price INT NOT NULL,             
    remaining INT NOT NULL DEFAULT 0,
    src JSON
);
