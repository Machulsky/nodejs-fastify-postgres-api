const pool = require("../../../../database/pool")
const bcrypt = require('bcryptjs')


module.exports.User = {
    tablename: 'platform_users',
    
    async findByUsername(username = 'string', platformId){
        try{
            const query = {
                text: `
                SELECT id, username, firstname, lastname, platform_id, password FROM ${this.tablename}
                WHERE username = $1 AND platform_id = $2
                `,
                values: [username, platformId]
            }

            const result = await pool.query(query)
            return result.rows

        }catch(e){
            console.error(e)
            throw e
        }
    },

    async exist(username = 'string', platform_id) {
        const user = await this.findByUsername(username, platform_id)
        
        if(user.length <= 0){
            return false
        }else{
            return user[0]
        }
    },

    async delete(id){
        try {
            const query = {
                text: `
                DELETE FROM users WHERE id = $1
                RETURNING id
                `,
                values: [id]
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
                text: `SELECT pu.id, pu.username, pu.firstname, pu.lastname, pu.patronym,
                json_agg(r.*) AS role,
                json_agg(cb.*) AS created_by,
                json_agg(pc.*) AS category,
                json_agg(plg.*) AS group
                FROM ${this.tablename} AS pu
                LEFT JOIN platform_user_role AS pur
                ON pu.id = pur.user_id
                LEFT JOIN roles AS r
                ON pur.role_id = r.id
                LEFT JOIN platform_users AS cb
                ON pu.created_by = cb.id
                LEFT JOIN platform_users_categories as puc
                ON puc.user_id = pu.id
                LEFT JOIN platform_categories as pc
                ON puc.category_id = pc.id
                LEFT JOIN platform_users_groups as pug
                ON pug.user_id = pu.id
                LEFT JOIN platform_groups as plg
                ON pug.group_id = plg.id
                GROUP BY pu.id 
                LIMIT $1 OFFSET $2
                `,
                values: [limit, offset]
            }
            const result = await pool.query(query)
            return result.rows
        }catch(e){
            throw e
        }
    },

    async findRolesByUserId(id){
        try {
            const query = {
                text: `
                SELECT r.id, r.tag, r.displayname FROM platform_user_role AS ur
                INNER JOIN roles AS r
                ON r.id = ur.role_id AND ur.user_id = $1
            
                `,
                values: [id]
            }
            const result = await pool.query(query)
            return result.rows

        } catch (e) {
            throw e
            
        }

    },

    async getPermissionsCountByUserId(id){
        try {
            const query = {
                text: `
                SELECT p.id  FROM user_permission AS up
                INNER JOIN permissions AS p
                ON up.permission_id = p.id AND up.user_id = $1
                UNION
                SELECT p.id  FROM user_role AS ur
                INNER JOIN role_permission AS rp
                ON rp.role_id = ur.role_id AND ur.user_id = $1
                INNER JOIN permissions AS p
                ON rp.permission_id = p.id
               
                
                `,
                values: [id]
            }
            const result = await pool.query(query)
            
           
            return result.rowCount

        } catch (e) {
            throw e
            
        }
    },

    async getPermissionsByUserId(id, limit, offset){
        try {
            const query = {
                text: `
                SELECT p.id, p.action, p.displayname FROM user_permission AS up
                INNER JOIN permissions AS p
                ON up.permission_id = p.id AND up.user_id = $1
                UNION
                SELECT p.id, p.action, p.displayname FROM user_role AS ur
                INNER JOIN role_permission AS rp
                ON rp.role_id = ur.role_id AND ur.user_id = $1
                INNER JOIN permissions AS p
                ON rp.permission_id = p.id
                ORDER BY id
                LIMIT $2 OFFSET $3
                `,
                values: [id, limit, offset]
            }
            const result = await pool.query(query)

            return result.rows

        } catch (e) {
            throw e
            
        }
    },

    async getRolesCountByUserId(id){
        try {
            const query = {
                text: `
                SELECT COUNT(*) FROM user_role AS ur
                INNER JOIN roles AS r
                ON r.id = ur.role_id AND ur.user_id = $1
                
                `,
                values: [id]
            }
            const result = await pool.query(query)
            return result.rows[0].count

        } catch (e) {
            throw e
            
        }

    },

    async findById(id){
        try {
            const query = {
                text: `
                SELECT id, username, email FROM ${this.tablename} WHERE id = $1 LIMIT 1
                `,
                values: [id]
            }
            const result = await pool.query(query)

            return result.rows[0] || undefined
            
        } catch (e) {
            throw e
        }
    },

    create(id, username, email, password){
        return {
            id, username, password, email
        }
    },

    async store(user = { 
        username: 'string', 
        password: 'string', 
        firstname: 'string',
        lastname: 'string',
        patronym: 'string',
        created_by: 'integer',
        platform_id: 'integer'  

    }){
        
        try{
            const query = {
                text: `
                INSERT INTO ${this.tablename} (username, firstname, lastname, patronym, created_by, platform_id, password)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, username, firstname, lastname, patronym, platform_id
                `,
                values: [
                    user.username, 
                    user.firstname, 
                    user.lastname, 
                    user.patronym || 'NULL', 
                    user.created_by, 
                    user.platform_id,
                    await bcrypt.hash(user.password, 8), 
                ],
            }

            const result = await pool.query(query)
            return result.rows[0]

        }catch(e){
            throw e
        }
    },

    async update(user){
        try {
            const query = {
                text: `
                UPDATE users SET username = $1, email = $2, password = $3
                WHERE id = $4
                RETURNING id, username, email
                `,
                values: [user.username, user.email, await bcrypt.hash(user.password, 8), user.id]
            }

            const result = await pool.query(query)
            return result.rows[0] || undefined
            
        } catch (e) {
            throw e
            
        }
        
    }

}