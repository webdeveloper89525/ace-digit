CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY key UNIQUE,
    name TEXT,
    email CHAR(100) unique not null,
	password text not null,
	createdAt timestamp,
	updatedAt timestamp
	token text
);

CREATE TABLE IF NOT EXISTS chart (
    id SERIAL PRIMARY key UNIQUE,
    label TEXT,
    val int,
    month int
);