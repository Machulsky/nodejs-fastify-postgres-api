const pool = require("../../../database/pool")

module.exports.Role = {
    tablename: 'roles',

    async store(role){
        try {
            const query = {
                text: ` INSERT INTO ${this.tablename} (tag, displayname)
                VALUES ($1, $2)
                RETURNING id, tag, displayname`,
                values: [role.tag, role.displayname]
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
                SELECT id, tag, displayname FROM ${this.tablename} WHERE id = $1 LIMIT 1
                `,
                values: [id]
            }
            const result = await pool.query(query)

            return result.rows[0] || undefined
            
        } catch (e) {
            throw e
        }
    },

    async findByTag(tag){
        try {
            const query = {
                text: `
                SELECT id, tag, displayname FROM ${this.tablename} WHERE tag = $1 LIMIT 1
                `,
                values: [tag]
            }
            const result = await pool.query(query)

            return result.rows[0] || undefined
            
        } catch (e) {
            throw e
        }
    },

    async delete (id = 'integer'){
        try{
                
            const query = {
                name: "delete-permission",
                text: `DELETE FROM ${this.tablename} WHERE id = $1
                RETURNING id, tag, displayname`,
                values: [id]
            }

            const result = await pool.query(query)
            
            return result.rows[0] || undefined

        }catch(e){
            throw e
        }
    },

    async getTotalCount(){
        try {
            const query = {
                text: `SELECT COUNT(*) FROM ${this.tablename}`,
                
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
                text: `SELECT id, tag, displayname FROM ${this.tablename}
                ORDER BY id LIMIT $1 OFFSET $2`,
                values: [limit, offset]
            }
            const result = await pool.query(query)
            return result.rows
        }catch(e){
            throw e
        }
    },

    async findPermissionsById(id, limit, offset){
        try {
            const query = {
                text: `
               
                SELECT p.id, p.action, p.displayname FROM role_permission AS rp
                INNER JOIN permissions AS p
                ON rp.permission_id = p.id AND rp.role_id = $1
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

    async update(role){
        try {
            const query = {
                text: `
                UPDATE ${this.tablename} SET tag = $1, displayname = $2
                WHERE id = $3
                RETURNING id, tag, displayname
                `,
                values: [role.tag, role.displayname, role.id]
            }

            const result = await pool.query(query)
            return result.rows[0]
            
        } catch (e) {
            throw e
            
        }
        
    },

    async attachUser(userId, roleId){
        try {
            const query = {
                text: `
                INSERT INTO user_role (user_id, role_id)
                select  $1,$2 
                where not exists ( 
                    select  role_id  from user_role
                    where user_id = $1 
                    and role_id = $2 )
                RETURNING role_id
                `,
                values: [ userId, roleId]
            }

            const result = await pool.query(query)

            return result.rows[0]
            
        } catch (e) {
            throw e
            
        }
    },

    async detachUser(userId, roleId){
        try {
            const query = {
                text: `
                DELETE FROM user_role WHERE user_id = $1 AND role_id = $2
                RETURNING role_id
                `,
                values: [ userId, roleId]
            }

            const result = await pool.query(query)

            return result.rows[0]
            
        } catch (e) {
            throw e
            
        }
    },

    create(id, tag, displayname){
        return {
            id,
            tag,
            displayname
        }
    },
}