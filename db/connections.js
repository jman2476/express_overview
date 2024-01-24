const mysql = require('mysql2')
require('dotenv').config()

const is_prod = process.env.NODE_ENV === 'production'


//create connection to mysql database
const db = mysql.createConnection({
    host: process.env.DP_HOST_URL,
    user: DB_USER,
    password: is_prod ? process.env.DB_PASSWORD : '',
    database: DB_DATABASE_NAME
})


module.exports = db.promise()