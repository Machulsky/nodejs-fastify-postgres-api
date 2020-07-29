/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    CREATE TABLE role_permission (
        role_id BIGINT NOT NULL,
        permission_id BIGINT NOT NULL,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
    );
    
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE role_permission;
    `)
};
