const pool = require("../../../database/pool")
const bcrypt = require('bcryptjs')


module.exports.RefreshToken = {
    tablename:'refresh_tokens',

    async exist(refreshSession = {userID: 'integer', fingerprint: 'string'}){
        try{
            const query = {
            
                text: `SELECT id, token, expires_in FROM ${this.tablename}
                WHERE user_id = $1 AND fingerprint = $2`,
                values: [refreshSession.userID, refreshSession.fingerprint]
            }
            const result = await pool.query(query)
            return result.rows

        }catch(e){
            throw e
        }
    },

    async check(refreshSession){
        try{
            console.log(refreshSession)

            const query = {
              
                text: `SELECT id, expires_in FROM ${this.tablename}
                WHERE token = $1 AND fingerprint = $2 ORDER BY expires_in LIMIT 1`,
                values: [refreshSession.token, refreshSession.fingerprint]
            }
            
            const result = await pool.query(query)
           
            return result.rows[0] || false

        }catch(e){
            throw e

        }
    },

    async delete (id = 'integer'){
        try{
                
            const query = {
                name: "delete-refresh-token",
                text: `DELETE FROM ${this.tablename} WHERE id = $1
                RETURNING id, ip, browser, system`,
                values: [id]
            }

            const result = await pool.query(query)
            console.log("Deleted refresh token id:"+id)
            return result.rows[0]

        }catch(e){
            throw e
        }
    },

    async deleteIfExist(refreshSession = {userID: 'integer', fingerprint: 'string'}){
        try{
            const sessionExist = await this.exist(refreshSession)
        if(sessionExist.length > 0) await this.delete(sessionExist[0].id)
        
        }catch(e){
            console.error(e)
            throw e
        }
        
    },

    async getCountByUserId(id){
        try{
            const query = {
                text: `SELECT COUNT(id) FROM ${this.tablename} WHERE user_id = $1`,
                values: [id]
            }
            const result = await pool.query(query)
            
            return result.rows[0].count

        }catch(e){
            throw e
        }
        
    },

    

    async getListByUserId(id, limit, offset){
        try{
            const query = {
                text: `SELECT id, expires_in, browser, system, ip FROM ${this.tablename}
                WHERE user_id = $1 ORDER BY expires_in DESC LIMIT $2 OFFSET $3`,
                values: [id, limit, offset]
            }
            const result = await pool.query(query)
            return result.rows
        }catch(e){
            throw e
        }
    },

    async store(refreshSession = {token: 'string', expiresIn: 'integer', userID: 'integer', ip: 'ip', fingerprint: 'string', browser: 'string', system: 'string'}){
        try{
            
            const query = {
                name: "store-refresh-token",
                text: ` INSERT INTO ${this.tablename} (token, user_id, ip, fingerprint, browser, system, expires_in)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            
                `,
                values: [refreshSession.token, 
                        refreshSession.userID, 
                        refreshSession.ip, 
                        refreshSession.fingerprint,
                        refreshSession.browser,
                        refreshSession.system, 
                        refreshSession.expiresIn]
            }

            const result = await pool.query(query)

            return result.rows

        }catch(e){
            throw e
        }
    },
}