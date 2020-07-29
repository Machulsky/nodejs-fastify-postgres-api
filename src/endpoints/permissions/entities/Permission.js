/**
 * 
 *      id BIGSERIAL primary key,
        action VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
 */

 // Permission.store(perm).then(result => {
    //     console.log(result)
    // })

    // Permission.applyRole(1, 1).then(result=>{
    //     console.log(result)
    // })
    // Role.store(role).then(result => {
    //     console.log(result)
    // })

    const pool = require("../../../database/pool")
    module.exports.Permission = {
        tablename: "permissions",
    
        async check(roleId, userId, permission){
            try {
                const query = {
                    name: 'check-permissions',
                    text: `
                        SELECT id FROM permissions AS p
                        JOIN role_permission AS rp
                        ON p.id = rp.permission_id AND rp.role_id = $1 AND  p.action = $2
                        OR p.action = '*' AND rp.role_id = $1 AND p.id = rp.permission_id
                        JOIN user_permission AS up
                        ON p.id = up.permission_id AND up.user_id = $3 AND p.action = $2
                        OR p.id = up.permission_id AND up.user_id = $3 AND p.action = $2
                        LIMIT 1
                    `,
                    values: [roleId, permission, userId]
                }
    
                const result = await pool.query(query)

                return result.rows
                
            } catch (e) {
                throw e
            }
        
        },

        async findByAction(action){
            try {
                const query = {
                    text: `
                    SELECT id, action, displayname FROM ${this.tablename} WHERE action = $1 LIMIT 1
                    `,
                    values: [action]
                }
                const result = await pool.query(query)

                return result.rows[0] || undefined
                
            } catch (e) {
                throw e
            }
        },

        async findById(id){
            try {
                const query = {
                    text: `
                    SELECT id, action, displayname FROM ${this.tablename} WHERE id = $1 LIMIT 1
                    `,
                    values: [id]
                }
                const result = await pool.query(query)

                return result.rows[0] || undefined
                
            } catch (e) {
                throw e
            }
        },
    

        async store(permission){
            try {
                const query = {
                    text: `
                    INSERT INTO ${this.tablename} (action, displayname)
                    VALUES ($1, $2)
                    RETURNING id, action, displayname
                    `,
                    values: [
                        permission.action,
                        permission.displayname
                    ]
                }
    
                const result = await pool.query(query)
    
                return result.rows[0]
                
            } catch (e) {
                throw e
            }
        },

        async delete (id = 'integer'){
            try{
                    
                const query = {
                    name: "delete-permission",
                    text: `DELETE FROM ${this.tablename} WHERE id = $1
                    RETURNING id, action, displayname`,
                    values: [id]
                }
    
                const result = await pool.query(query)
                
                return result.rows[0]
    
            }catch(e){
                throw e
            }
        },

        async attachRole(roleId, permissionId){
            try {
                const query = {
                    text: `
                    INSERT INTO role_permission (role_id, permission_id)
                    select  $1,$2 
                    where not exists ( 
                        select  role_id  from role_permission 
                        where role_id = $1 
                        and permission_id = $2 )
                    RETURNING permission_id
                    `,
                    values: [ roleId, permissionId]
                }
    
                const result = await pool.query(query)
    
                return result.rows[0]
                
            } catch (e) {
                throw e
                
            }
        },

        async detachRole(roleId, permissionId){
            try {
                const query = {
                    text: `
                    DELETE FROM role_permission WHERE role_id = $1 AND permission_id = $2
                    RETURNING permission_id
                    `,
                    values: [ roleId, permissionId]
                }
    
                const result = await pool.query(query)
    
                return result.rows[0]
                
            } catch (e) {
                throw e
                
            }
        },

        async detachUser(userId, permissionId){
            try {
                const query = {
                    text: `
                    DELETE FROM user_permission WHERE user_id = $1 AND permission_id = $2
                    RETURNING permission_id
                    `,
                    values: [ userId, permissionId]
                }
               
                const result = await pool.query(query)
    
                return result.rows[0]
                
            } catch (e) {
                throw e
                
            }
        },
        async allAttachedUsers() {
            try {
                const query = {
                    text: `
                    SELECT * FROM user_permission
                    `

                }

                const result = await pool.query(query)
                console.log(result.rows)
                
                
            } catch (e) {
                throw e
                
            }
        },
        async attachUser(userId, permissionId){
            try {
                
                const query = {
                    text: `
                    INSERT INTO user_permission (user_id, permission_id)
                    select  $1,$2 
                    where not exists ( 
                        select  user_id  from user_permission 
                        where user_id = $1 
                        and permission_id = $2 )
                    RETURNING permission_id
                    `,
                    values: [ userId, permissionId]
                }
               
                const result = await pool.query(query)
                
                return result.rows[0]
                
            } catch (e) {
                throw e
                
            }
        },

        async getTotalCount(){
            try {
                const query = {
                    text: `SELECT COUNT(1) FROM ${this.tablename}`,
                    
                }

                const result = await pool.query(query)
                return result.rows[0].count


                
            } catch (e) {
                throw e
                
            }
        },
        async getAll(limit, offset){
            try{
                const query = {
                    text: `SELECT id, action, displayname FROM ${this.tablename}
                    ORDER BY id LIMIT $1 OFFSET $2`,
                    values: [limit, offset]
                }
                const result = await pool.query(query)
                return result.rows
            }catch(e){
                throw e
            }
        },

        create(id, action, displayname){
            return {
                id,
                action,
                displayname
            }
        },

        async update(permission){
            try {
                const query = {
                    text: `
                    UPDATE permissions SET action = $1, displayname = $2
                    WHERE id = $3
                    RETURNING id, action, displayname
                    `,
                    values: [permission.action, permission.displayname, permission.id]
                }

                const result = await pool.query(query)
                return result.rows[0]
                
            } catch (e) {
                throw e
                
            }
            
        }
    
    }