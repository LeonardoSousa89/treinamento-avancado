/*https://www.codegrepper.com/code-examples/whatever/knex.first*/

CREATE DATABASE dataauthtest;
DROP   DATABASE dataauthtest;

\c dataauthtest

CREATE TABLE IF NOT EXISTS messagetest(
   test VARCHAR(100) NOT NULL UNIQUE
);
DROP TABLE messagetest;

INSERT INTO messagetest VALUES('OK, i am online!');

SELECT * FROM messagetest;


CREATE TABLE IF NOT EXISTS authtest(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(250)
);
DROP TABLE authtest;

SELECT * FROM authtest;


CREATE TABLE IF NOT EXISTS authdata(
    id SERIAL PRIMARY KEY,
    girlname VARCHAR(100) NOT NULL,
    yearofmeet VARCHAR(100) NOT NULL,
    statusofloved VARCHAR(100) NOT NULL
);
DROP TABLE authdata;

SELECT * FROM authdata;