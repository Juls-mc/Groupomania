const db = require('../db.js');
const mysql = require('mysql');


class ModerationModel {
    constructor(){
    }

    getAllPosts() {
        let sql = "SELECT p.id, p.userId, p.title, p.content, DATE_FORMAT(p.date, '%e/%m/%y à %k:%i:%s') AS date, p.likes, u.lastName, u.firstName FROM posts p JOIN users u ON p.userId = u.id ORDER BY date DESC";
        return new Promise((resolve) =>{
            db.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    };

    deletePost(sqlTab){
        let sql = 'DELETE FROM posts WHERE id = ?';
        sql = mysql.format(sql, sqlTab);
        return new Promise((resolve) =>{
            db.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Le post a bien été supprimé.'});
            })
        })
    };

    getAllComments(){
        let sql = "SELECT c.comContent, DATE_FORMAT(c.date, '%e/%m/%y à %k:%i:%s') AS date, c.id, c.userId, u.firstName, u.lastName FROM comments c JOIN users u ON c.userId = u.id ORDER BY date DESC";
        return new Promise((resolve) =>{
            db.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        })
    };

    deleteComment(sqlTab){
        let sql  = 'DELETE FROM comments WHERE id = ?';
        sql = mysql.format(sql, sqlTab);
        return new Promise((resolve) =>{
            db.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Le commentaire a bien été supprimé.'});
            })
        })
    }
};

module.exports = ModerationModel;