const db = require('../db.js');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserModel {
    constructor(){
    }

    signup(sqlTab){
        let sql = 'INSERT INTO users VALUES(NULL, ?, ?, ?, ?, NULL)';
        sql = mysql.format(sql, sqlTab);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if (err) reject({error : 'Erreur inscription'});
                resolve({message : 'Nouvel utilisateur !'})
            })
        })
    } 

    login(sqlTab, password){
        let sql = 'SELECT * FROM users WHERE email = ?';
        sql= mysql.format(sql, sqlTab);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if (err) reject({ err });
                if (!result[0]){
                    reject ({ error : 'Utilisateur introuvable dans la base de données.'});
                } else {
                    bcrypt.compare(password, result[0].password)
                        .then(valid => {
                            if (!valid) return reject({ error: 'Mot de passe incorrect !' });
                            resolve({
                                userId: result[0].id,
                                moderation: result[0].moderation,
                                token: jwt.sign(
                                    { userId: result[0].id,
                                        moderation: result[0].moderation },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        })
                        .catch(error => reject({ error }));
                }
            })
        })
    };

    displayProfile(sqlTab){
        let sql= 'SELECT firstName, lastName, email FROM users WHERE id = ?';
        sql = mysql.format(sql, sqlTab);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if (err) return reject({error : 'Page indisponible'});
                resolve(result);
            })
        })
    };

    modifyProfile(sqlTab){
        let sql= 'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
        sql = mysql.format(sql, sqlTab);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if (err) return reject({error : 'Fonction indisponible'});
                resolve({message : 'Informations ont été mises à jour!'});
            })

        })
    };

    deleteUser(sqlTab){
        let sql = 'DELETE FROM users WHERE id = ?';
        sql = mysql.format(sql, sqlTab);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if (err) return reject({error : 'Fonction indisponible'});
                resolve({message : 'Utilisateur supprimé'});
            })

        })

    }
};

module.exports = UserModel;