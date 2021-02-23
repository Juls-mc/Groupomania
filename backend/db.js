let mysql = require('mysql');
require('dotenv').config()

let db = mysql.createConnection({
    host               : process.env.DB_HOST,
    user               : process.env.DB_USER,
    password           : process.env.DB_PASSWORD,
    database           : process.env.DB_DATABASE,
    port               : process.env.DB_PORT,
}); 

db.connect(err => {
    if(err) {
        console.log('Non Connecté à Groupomania ! : ' + JSON.stringify(err, undefined,2))
    } else {
        console.log('Connecté à Groupomania !')
    }
})

module.exports = db;