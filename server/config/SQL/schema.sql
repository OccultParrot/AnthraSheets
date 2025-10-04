-- Users Table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
    discord_id    BIGINT PRIMARY KEY,
    username      VARCHAR(100) NOT NULL,
    global_name  VARCHAR(100),
    discriminator VARCHAR(10)  NOT NULL,
    avatar_url    TEXT,
    email         VARCHAR(255),
    admin_level   INTEGER      NOT NULL DEFAULT 0 CHECK (admin_level >= 0),
    created_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP
);

-- Directories Table
DROP TABLE IF EXISTS directories CASCADE;
CREATE TABLE directories
(
    id          SERIAL PRIMARY KEY,
    user_id     BIGINT       NOT NULL,
    name        VARCHAR(200) NOT NULL,
    description TEXT,
    is_public   BOOLEAN   DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (discord_id) ON DELETE CASCADE
);

-- Sheets Table
DROP TABLE IF EXISTS sheets CASCADE;
CREATE TABLE sheets
(
    id           SERIAL PRIMARY KEY,
    directory_id INTEGER NOT NULL,
    name         VARCHAR(200),
    content      TEXT,
    image_hrefs  JSONB,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (directory_id) REFERENCES directories (id) ON DELETE CASCADE
);

-- Tags Table
DROP TABLE IF EXISTS tags CASCADE;
CREATE TABLE tags
(
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(200) NOT NULL UNIQUE,
    color VARCHAR(7) CHECK (color ~ '^#[0-9A-Fa-f]{6}$'
) ,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT NOT NULL,
  FOREIGN KEY(created_by) REFERENCES users(discord_id)
);

-- Sheets + Tags Junction Table
DROP TABLE IF EXISTS sheet_tags CASCADE;
CREATE TABLE sheet_tags
(
    sheet_id INTEGER NOT NULL,
    tag_id   INTEGER NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (sheet_id, tag_id),
    FOREIGN KEY (sheet_id) REFERENCES sheets (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_directories_user_id ON directories(user_id);
CREATE INDEX IF NOT EXISTS idx_sheets_directory_id ON sheets(directory_id);
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_tags_created_by ON tags(created_by);

-- Function to automatically update updated_at timestamps
CREATE
OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at
= CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$
language 'plpgsql';

-- Drop existing triggers first, then create new ones
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE
    ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_directories_updated_at ON directories;
CREATE TRIGGER update_directories_updated_at
    BEFORE UPDATE
    ON directories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sheets_updated_at ON sheets;
CREATE TRIGGER update_sheets_updated_at
    BEFORE UPDATE
    ON sheets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
