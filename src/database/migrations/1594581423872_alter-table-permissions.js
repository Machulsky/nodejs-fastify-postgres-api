/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    ALTER TABLE permissions
    ADD displayname VARCHAR(255) NULL;
    `)
};

exports.down = pgm => {
    pgm.sql(`
    ALTER TABLE permissions
    DROP COLUMN displayname;
    `)
};
