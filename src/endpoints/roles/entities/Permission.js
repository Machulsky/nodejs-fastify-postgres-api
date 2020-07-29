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
    
        async getCountByRoleId(roleId){
            try {
                const query = {
                    text: `
                    SELECT COUNT(*) FROM permissions as p
                    INNER JOIN role_permission as rp
                    ON rp.role_id = $1 AND p.id = rp.permission_id
                    `,
                    values: [roleId]
                }

                const result = await pool.query(query)

                return result.rows[0].count
                
            } catch (e) {
                throw e
                
            }
        }
    
    }