/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    ALTER TABLE platforms
    ADD created_by BIGINT NOT NULL,
    ADD FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE;
    `)
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE platforms
        DROP COLUMN created_by;
    `)
};
