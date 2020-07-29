/**
 * 
 *      id BIGSERIAL primary key,
        action VARCHAR(255) NOT NULL,
        controller VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
 */

    const pool = require("../../../database/pool")
    module.exports.Permission = {
        tablename: "permissions",
        async checkRole(roleId, permission){
            try {
                const query = {
                    name: 'check-role-permissions',
                    text: `
                        SELECT id FROM permissions AS p
                        JOIN role_permission AS rp
                        ON p.id = rp.permission_id AND rp.role_id = $1 AND  p.action = $2
                        OR p.action = '*' AND rp.role_id = $1 AND p.id = rp.permission_id
                    `,
                    values: [roleId, permission]
                }
    
                const result = await pool.query(query)
               
                return result.rows
                
            } catch (e) {
                throw e
            }
        
        },

        async checkUser(userId, permission){
            try {
                const query = {
                    name: 'check-user-permissions',
                    text: `
                        SELECT id FROM permissions AS p
                        JOIN user_permission AS up
                        ON p.id = up.permission_id AND up.user_id = $1 AND p.action = $2
                        OR p.id = up.permission_id AND up.user_id = $1 AND p.action = '*'
                    `,
                    values: [userId, permission]
                }
    
                const result = await pool.query(query)
                
                return result.rows
                
            } catch (e) {
                throw e
            }
        
        },
    

        async store(permission){
            try {
                const query = {
                    text: `
                    INSERT INTO ${this.tablename} (action, displayname)
                    VALUES ($1, $2, $3)
                    RETURNING id
                    `,
                    values: [
                        permission.action,
                        permission.displayname
                    ]
                }
    
                const result = await pool.query(query)
    
                return result
                
            } catch (e) {
                throw e
            }
        },

        async applyRole(roleId, permissionId){
            try {
                const query = {
                    text: `
                    INSERT INTO role_permission (role_id, permission_id)
                    VALUES ($1, $2)
                    RETURNING permission_id
                    `,
                    values: [ roleId, permissionId]
                }
    
                const result = await pool.query(query)
    
                return result
                
            } catch (e) {
                throw e
                
            }
        },

        async applyUser(userId, permissionId){
            try {
                const query = {
                    text: `
                    INSERT INTO user_permission (user_id, permission_id)
                    VALUES ($1, $2)
                    RETURNING permission_id
                    `,
                    values: [ userId, permissionId]
                }
    
                const result = await pool.query(query)
    
                return result
                
            } catch (e) {
                throw e
                
            }
        }
    
    }