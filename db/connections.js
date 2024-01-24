const mysql = require('mysql2')

//create connection to mysql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
  
    database: 'msql_first_day_db'
})


module.exports = db.promise()