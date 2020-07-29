/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE platform_users_categories(
            user_id BIGINT NOT NULL,
            category_id BIGINT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES platform_users(id) ON DELETE CASCADE,
            FOREIGN KEY (category_id) REFERENCES platform_categories(id) ON DELETE CASCADE
        );
    `)
};

exports.down = pgm => {
    pgm.sql(`
    
        DROP TABLE platform_users_categories;
    `)
};
