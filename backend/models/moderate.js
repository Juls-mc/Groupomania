const db = require('../db.js');
const mysql = require('mysql');


class ModerateModel {
    constructor(){
    }

    getAllPosts() {
        let sql = "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(posts.date, '%e/%m/%y à %k:%i:%s') AS date, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY date DESC";
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
        let sql = "SELECT comments.comContent, DATE_FORMAT(comments.date, '%e/%m/%y à %k:%i:%s') AS date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id ORDER BY date DESC";
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

module.exports = ModerateModel;