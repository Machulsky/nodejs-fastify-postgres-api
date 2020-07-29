/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE platform_users_groups(
            user_id BIGINT NOT NULL,
            group_id BIGINT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES platform_users(id) ON DELETE CASCADE,
            FOREIGN KEY (group_id) REFERENCES platform_groups(id) ON DELETE CASCADE
        );
    `)
};

exports.down = pgm => {
    pgm.sql(`
    
        DROP TABLE platform_users_groups;
    `)
};
