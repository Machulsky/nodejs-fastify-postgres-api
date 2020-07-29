const pool = require("../../../database/pool")
const bcrypt = require('bcryptjs')


module.exports.User = {
    tablename: 'users',
    
    async findByUsername(username = 'string'){
        try{
            const query = {
                text: `
                SELECT id, username, password FROM ${this.tablename}
                WHERE username = $1
                `,
                values: [username]
            }

            const result = await pool.query(query)
            return result.rows

        }catch(e){
            console.error(e)
            throw e
        }
    },

    async exist(username = 'string') {
        const user = await this.findByUsername(username)
        
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
                text: `SELECT id, email, username FROM ${this.tablename}
                ORDER BY id LIMIT $1 OFFSET $2`,
                values: [limit, offset]
            }
            const result = await pool.query(query)
            return result.rows
        }catch(e){
            throw e
        }
    },

    async findRolesByUserId(id, limit, offset){
        try {
            const query = {
                text: `
                SELECT r.id, r.tag, r.displayname FROM user_role AS ur
                INNER JOIN roles AS r
                ON r.id = ur.role_id AND ur.user_id = $1
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

    async store(user = { username: 'string', password: 'string', email: 'email' }){
        try{
            const query = {
                text: `
                INSERT INTO ${this.tablename} (username, password, email)
                VALUES ($1, $2, $3)
                RETURNING id, username, email
                `,
                values: [user.username, await bcrypt.hash(user.password, 8), user.email]
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
        
    },
    
    async getPlatforms(userId){
        try {
            const query = {
                text: `
                SELECT id, tag, title, data FROM platforms
                WHERE created_by = $1
                `,
                values: [userId]
            }

            const result = await pool.query(query)

            return result.rows
        } catch (error) {
            throw error
            
        }
    },

    async getPlatformsCount(userId){
        try {
            const query = {
                text: `
                SELECT COUNT(*) FROM platforms
                WHERE created_by = $1
                `,
                values: [userId]
            }

            const result = await pool.query(query)

            return result.rows[0].count
        } catch (error) {
            throw error
            
        }
    }

}