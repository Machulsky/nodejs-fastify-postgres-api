/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE platform_users (
            id BIGSERIAL primary key,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            patronym VARCHAR(255) NULL,
            platform_id BIGINT NOT NULL,
            FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE,
            created_by BIGINT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE platform_users;
    `)
};
