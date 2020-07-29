const { Pool } = require("pg")
const dbconfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "09080709",
    database: process.env.DB_NAME || "education_platform",
    max: 100,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 5000
}

const pool = new Pool(dbconfig)

module.exports = pool