const pool = require("../../../database/pool")
const bcrypt = require('bcryptjs')


module.exports.User = {
    tablename: 'users',
    
    async findByLogin(login = 'string'){
        try{
            const query = {
                text: `
                SELECT id, username, password FROM ${this.tablename}
                WHERE username = $1 OR email = $1
                `,
                values: [login]
            }

            const result = await pool.query(query)
            return result.rows

        }catch(e){
            console.error(e)
            throw e
        }
    },

 

    async exist(login= 'string') {
        const user = await this.findByLogin(login)
        
        if(user.length <= 0){
            return false
        }else{
            return user[0]
        }
    },

    async findById(id){
        try{
            const query = {
                text: `SELECT id, username, email, password, created_at FROM ${this.tablename}
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

    async getRole(userId){
        try{
            const query = {
                text: `
                SELECT role_id FROM user_role
                WHERE user_id = $1
                `,
                values: [userId]
            }

            const result = await pool.query(query)
            return result.rows[0].role_id

        }catch(e){
            console.error(e)
            throw e
        }

    },

    async store(user = { username: 'string', password: 'string', email: 'email' }){
        
        try{
            const query = {
                text: `
                INSERT INTO ${this.tablename} (username, password, email)
                VALUES ($1, $2, $3)
                RETURNING id, username
                `,
                values: [user.username, await bcrypt.hash(user.password, 8), user.email]
            }

            const result = await pool.query(query)
            return result.rows[0]

        }catch(e){
            throw e
        }
    }

}