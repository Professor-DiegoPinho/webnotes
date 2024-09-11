CREATE DATABASE webnotes;

\c webnotes  -- Comando do PostgreSQL para conectar ao novo banco

CREATE TABLE docs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL
);

DO $$
BEGIN
  RAISE NOTICE 'DATABASE CREATED';
END $$;