const mysql = require('mysql');
console.log('Connexion à la base de données...');

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'groupomania',
});
db.connect(function(err) {
    if (err) throw err;
    console.log('Connecté à Groupomania !')
});

module.exports = db;