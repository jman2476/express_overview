DROP DATABASE IF EXISTS msql_first_day_db;

CREATE DATABASE msql_first_day_db;

USE msql_first_day_db;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);

SELECT * FROM users;

