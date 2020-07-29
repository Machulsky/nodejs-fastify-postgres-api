/**
 *  id SERIAL PRIMARY KEY,
    tag VARCHAR(255) NOT NULL UNIQUE,
    displayname VARCHAR(255) NOT NULL
 */
const pool = require("../../../database/pool")
module.exports.Role = {
    tablename: "roles",
    fillable: ["id", "tag", "displayname"],

    async store(role){
      
        const sql = `
            INSERT INTO ${this.tablename} (tag, displayname)
            VALUES ($1, $2)

            RETURNING id
        `
        let replacements = [
            role.tag,
            role.displayname
        ]
    
        return pool.query(sql, replacements)
        .then((res) => {
           
            return res.rows[0].id
        })
        .catch(err => {
            throw err
        })
    },

    findById(id){
        const sql = `
            SELECT id, tag, displayname FROM ${this.tablename}
            WHERE id = $1
        `
        return pool.query(sql, [id])
        .then(res => {
            return res.rows
        })
        .catch(err => {
            throw err
        })

    },

    
}