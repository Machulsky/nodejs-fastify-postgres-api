const pool = require("../../../../database/pool")
/**
 *  id BIGSERIAL primary key,
        tag VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        data JSONB NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
 */
module.exports.Platform = {
    tablename: 'platforms',
    async create(tag, title, data, created_by = 'user_id'){
        return {
            tag,
            title,
            data,
            created_by
        }
    },

    async store(platform){
        try {
            const query = {
                text: `INSERT INTO ${this.tablename} (tag, title, data, created_by) 
                VALUES ($1, $2, $3, $4)
                RETURNING id, tag,title, data
                `,
                values: [platform.tag, platform.title, platform.data, platform.created_by]
            }
    
            const result = await pool.query(query);
            return result.rows
            
        } catch (e) {
            throw e
            
        }
        
    },

    async delete (id) {
        try {
            const query = {
                text: `DELETE FROM ${this.tablename} WHERE id = $1 RETURNING id, tag, title`,
                values: [id]
            }

            const result = await pool.query(query)

            return result.rows
            
        } catch (e) {
            throw e
            
        }
    },

    async update(platform){
        try {
            const query = {
                text: `UPDATE platforms SET tag = $1, title = $2 WHERE id = $3`,
                values: [platform.tag, platform.title, platform.id]
            }
    
            const result = await pool.query(query)
    
            return result.rows

            
        } catch (e) {
            throw e
            
        }
        
    },

    async getTotalCount (){
        const query = {
            text: `SELECT COUNT(*) FROM ${this.tablename}`
        }

        const result = await pool.query(query)

        return result.rows[0].count
    },

    async getAll (limit, offset) {
        try {
            const query = {
                text: `SELECT id, tag, title, data FROM ${this.tablename}
                    LIMIT $1 OFFSET $2
                `,
                values: [limit, offset]
            }

            const result = await pool.query(query)
            return result.rows
            
        } catch (e) {
            throw e
            
        }
    },

    async getUserPlatforms(userId, limit = 100, offset = 0){
        try {
            const query = {
                text: `SELECT id, tag, title, data FROM ${this.tablename} 
                    WHERE created_by = $1 LIMIT $2 OFFSET $3
                `,
                values: [userId, limit, offset]
            }

            const result = await pool.query(query)

            return result.rows
            
        } catch (e) {
            throw e
            
        }
    },

    async getByTag(tag){
        try {
            const query = {
                text: `
                    SELECT id, tag, title, data FROM ${this.tablename}
                    WHERE tag = $1
                `,
                
                values: [tag]
            }

            const result = await pool.query(query)

            return result.rows
            
        } catch (e) {
            throw e
        }
    },

    async getById(id){
        try {
            const query = {
                text: `
                    SELECT id, tag, title, data FROM ${this.tablename}
                    WHERE id = $1
                `,
                values: [id]
            }

            const result = await pool.query(query)

            return result.rows
            
        } catch (e) {
            throw e
        }
    },

    

    async getByUserId(userId, platformId){
        try {
            const query = {
                text: `
                    SELECT u.* FROM ${this.tablename} AS p
                    INNER JOIN users AS u
                    ON p.created_by = $1 AND p.id = $2 AND p.created_by = u.id
                   
                `,
                values: [userId, platformId]
            }

            const result = await pool.query(query)

            return result.rows[0]
            
        } catch (e) {
            throw e
            
        }
    }
}