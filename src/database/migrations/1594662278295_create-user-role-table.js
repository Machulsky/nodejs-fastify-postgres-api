/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    CREATE TABLE user_role (
        user_id BIGINT NOT NULL,
        role_id BIGINT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    );
    
    `)
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE user_role;
    `)
};
