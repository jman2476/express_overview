const mysql = require('mysql2')
require('dotenv').config()


//create connection to mysql database
const db = mysql.createConnection({
    host: process.env.DB_HOST_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE_NAME
})


module.exports = db.promise()