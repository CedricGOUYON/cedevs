-- ── Extensions ───────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Table users ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
	id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	email      VARCHAR(255) UNIQUE NOT NULL,
	password   VARCHAR(255) NOT NULL,
	name       VARCHAR(100),
	avatar     VARCHAR(500),
	role       VARCHAR(20) DEFAULT 'free' CHECK (role IN ('free', 'premium', 'admin')),
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
);

-- ── Index ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ── Trigger updated_at ────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Utilisateur Lambda ────────────────────────────────
INSERT INTO users (email, password, name, avatar, role)
VALUES (
	'user@example.com',
	'$2b$10$hashed_password_example_here',
	'John Doe',
	'https://via.placeholder.com/150',
	'free'
)
ON CONFLICT (email) DO NOTHING;
