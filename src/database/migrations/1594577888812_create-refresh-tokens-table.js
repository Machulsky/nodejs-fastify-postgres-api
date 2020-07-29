/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    CREATE TABLE refresh_tokens (
        id BIGSERIAL primary key,
        token TEXT NOT NULL UNIQUE,
        user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE,
        ip VARCHAR(20) NULL,
        fingerprint VARCHAR(255) NULL,
        expires_in BIGINT NOT NULL,
        browser VARCHAR(20) NULL,
        system VARCHAR(20) NULL,
        created_at TIMESTAMP DEFAULT NOW()
        
    );
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE refresh_tokens;
    `)
};
