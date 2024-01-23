DROP DATABASE IF EXISTS msql_first_day_db;

CREATE DATABASE msql_first_day_db;

USE msql_first_day_db;

CREATE TABLE users (
    username VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);

INSERT INTO users (username, email, password) VALUES
    ('JD', 'jdtest@test.com', 'password123'),
    ('Bob', 'bobtest@test.com', 'password123'),
    ('Jane', 'janetest@test.com', 'password123'),
    ('Derry', 'derrytest@test.com', 'password123'),
    ('Lior', 'liortest@test.com', 'password123'),
    ('Jeremy', 'jeremytest@test.com', 'password123');

SELECT * FROM users;

