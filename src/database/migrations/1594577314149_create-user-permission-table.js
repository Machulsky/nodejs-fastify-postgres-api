/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    CREATE TABLE user_permission (
        user_id BIGINT NOT NULL,
        permission_id BIGINT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
    );
    
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE user_permission;
    `)
};
