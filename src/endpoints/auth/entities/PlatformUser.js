const pool = require("../../../database/pool")
const bcrypt = require('bcryptjs')

module.exports.PlatformUser ={
    tablename: 'platform_users',

    async findByLogin(login, platformId){
        try {
            const query = {
                text: `SELECT id, username, firstname, lastname, patronym, platform_id FROM ${this.tablename}
                WHERE username = $1 AND platform_id = $2
                `,
                values: [login, platformId]
            }

            const result = await pool.query(query)
            
            return result.rows[0]
            
        } catch (e) {
            throw e
            
        }

    },
}