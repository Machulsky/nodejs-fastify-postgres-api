const pool = require("../../../../database/pool")
const bcrypt = require('bcryptjs')


module.exports.User = {
    tablename: 'platform_users',
    
    async findByUsername(username = 'string', platformId){
        try{
            const query = {
                text: `
                SELECT id, username, firstname, lastname, patronym, platform_id, created_by, created_at, password FROM ${this.tablename}
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

    async getRole(userId){
        try{
            const query = {
                text: `
                SELECT role_id FROM platform_user_role
                WHERE user_id = $1
                `,
                values: [userId]
            }

            const result = await pool.query(query)
            return result.rows[0]

        }catch(e){
            console.error(e)
            throw e
        }

    },

    async exist(username = 'string', platformId) {
        const user = await this.findByUsername(username, platformId)
        
        if(user.length <= 0){
            return false
        }else{
            return user[0]
        }
    },

    async findById(id){
        try{
            const query = {
                text: `SELECT id, username, firstname, lastname, patronym, platform_id, created_by, created_at FROM ${this.tablename}
                WHERE id = $1`,
                values: [id]
            }

            const result = await pool.query(query)

            return result.rows[0]

        }catch (e){
            console.error(e)
            throw e

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
                    await bcrypt.hash(user.password, 8), 
                    user.platform_id
                ],
            }

            const result = await pool.query(query)
            return result.rows[0]

        }catch(e){
            throw e
        }
    },

    async findRoleByUserId(id){
        try {
            const query = {
                text: `
                SELECT r.id, r.tag, r.displayname FROM platform_user_role AS ur
                INNER JOIN roles AS r
                ON r.id = ur.role_id AND ur.user_id = $1
                LIMIT 1
                `,
                values: [id]
            }
            const result = await pool.query(query)
            return result.rows

        } catch (e) {
            throw e
            
        }

    },

    async getPermissionsByUserId(id, limit, offset){
        try {
            const query = {
                text: `
               
                SELECT p.id, p.action, p.displayname FROM platform_user_role AS ur
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

}