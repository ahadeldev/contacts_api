-- install pgcrypto extension for generating IDs as UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- check if the extension installed
SELECT * FROM pg_extension WHERE extname = 'pgcrypto';

-- create database
CREATE DATABASE contacts_api;

-- create the users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  email VARCHAR(50),
  address TEXT,
  user_id UUID REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create logout jwt tokens
CREATE TABLE logout_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create new user for the api
CREATE USER contacts_user WITH PASSWORD 'contacts_pass';

-- grant privileges on All tables and sequences
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO contacts_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO contacts_user;

-- grant usage and create privileges on the schema
GRANT USAGE ON SCHEMA public TO contacts_user;
GRANT CREATE ON SCHEMA public TO contacts_user;
