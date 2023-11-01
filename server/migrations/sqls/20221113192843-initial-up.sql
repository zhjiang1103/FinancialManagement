/* Replace with your SQL commands */
CREATE TABLE movies(id SERIAL PRIMARY KEY, name varchar(255),api_id INT);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    lastname character varying(255),
    firstname character varying(255),
    email character varying(255),
);

CREATE TABLE favorite (
    user_id INTEGER,
    movie_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

INSERT INTO movies (id, name, api_id) VALUES
(1,'Saw X',951491);
INSERT INTO users (lastname, firstname, email) VALUES 
('Wong','Steven','stevenWong@gmail.com');
INSERT INTO favorite (user_id, movie_id) VALUES 
(1,1);

-- SELECT pg_catalog.setval('students_id_seq', 16, true);

