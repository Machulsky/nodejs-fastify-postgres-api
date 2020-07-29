/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE roles (
            id SERIAL PRIMARY KEY,
            tag VARCHAR(255) NOT NULL UNIQUE,
            displayname VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()

        );
    `)
};

exports.down = pgm => {
    pgm.sql(`DROP TABLE roles;`)
};
