CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    date timestamp not null default CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password) VALUES ('lazyswan867', 'celina.andre@example.com', 'mmmmmmm');
INSERT INTO users (username, email, password) VALUES ('sadbutterfly175', 'lenny.lopez@example.com', 'lindsay');
INSERT INTO users (username, email, password) VALUES ('whiteostrich875', 'jerry.baker@example.com', 'stephen');
 