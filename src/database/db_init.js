const mysql = require("mysql2")
const dotenv = require("dotenv")

dotenv.config()
const db = mysql.createConnection({
    host: `${process.env.DB_IP}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
})

db.connect((err) => {
    if (err) {
        console.log(`Database connection failed: ${err.message}`)
        process.exit(1)
    } else {
        console.log("Database connected")
    }
})

module.exports = db