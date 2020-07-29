/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    CREATE TABLE platforms (
        id BIGSERIAL primary key,
        tag VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        data JSONB NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
    `)
};

exports.down = pgm => {
    pgm.sql(`
    
        DROP TABLE platforms;
    `)
};
