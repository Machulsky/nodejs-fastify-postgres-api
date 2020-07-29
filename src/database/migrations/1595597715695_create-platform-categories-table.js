/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE platform_categories (
            id BIGSERIAL primary key,
            title VARCHAR(255) NULL,
            published BOOLEAN NULL,
            parent_id BIGINT NULL,
            platform_id BIGINT NOT NULL,
            FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE platform_categories;
    `)
};
