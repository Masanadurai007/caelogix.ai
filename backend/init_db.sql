-- Run once against a fresh PostgreSQL database before the first migration,
-- to enable the pgvector extension used for RAG embeddings.
CREATE EXTENSION IF NOT EXISTS vector;
