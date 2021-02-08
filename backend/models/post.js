const db = require('../db.js');
const mysql = require('mysql');


class PostModel {
    constructor(){
    }

    createPost(sqlTabs){
        let sql = 'INSERT INTO posts VALUES(NULL, ?, ?, ?, NOW(), 0)';
        sql = mysql.format(sql, sqlTabs);
        return new Promise((resolve) =>{
            db.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve({message : 'Le nouveau post a bien été créé!'});
            })
        })
    };

    modifyPost(sqlTab1, sqlTab2){
        let sqlRequest1 = 'SELECT * FROM posts where id = ?';
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        return new Promise((resolve) =>{
            db.query(sqlRequest1, function (err, result, fields){
                if (err) throw err;
                if(sqlTab2[3] === result[0].userId){
                    let sqlRequest2 = 'UPDATE posts SET title = ?, content = ? WHERE id = ? AND userId = ?';
                    sqlRequest2 = mysql.format(sqlRequest2, sqlTab2);
                    db.query(sqlRequest2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Le post a bien été modifié.'});
                    })
                }else{
                    reject({error: 'La fonction est indisponible.'});
                }
            })
        })
    };

    deletePost(sqlTab1, sqlTab2){
        let sqlRequest1 = 'SELECT * FROM posts where id = ?';
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        return new Promise((resolve, reject) =>{
            db.query(sqlRequest1, function (err, result, fields){
                if (err) throw err;
                if(sqlTab2[1] === result[0].userId){
                    let sqlRequest2 = 'DELETE FROM posts WHERE id = ? AND userId = ?';
                    sqlRequest2 = mysql.format(sqlRequest2, sqlTab2);
                    db.query(sqlRequest2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Le post a bien été supprimé.'});
                    })
                } else {
                    reject({error: 'La fonction est indisponible.'});
                }
            })
        })
    };

    postLike(sqlTab1, sqlTab2, liked){
        let sqlRequest1 = 'INSERT INTO likes VALUES (NULL, ?, ?)';
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        let sqlRequest2 = 'UPDATE posts SET likes = ? WHERE id = ?';
        sqlRequest2 = mysql.format(sqlRequest2, sqlTab2);
        let sqlRequest3 = 'DELETE FROM likes WHERE postId = ? AND userId = ?';
        sqlRequest3 = mysql.format(sqlRequest3, sqlTab1);
        return new Promise((resolve) =>{
            db.query(sqlRequest2, function (err, result, fields){
                if (err) throw err;
            });
            if(liked === false){
                db.query(sqlRequest1, function (err, result, fields){
                    if (err) throw err;
                    resolve({ message: 'Like !'})
                })
            }
            if(liked === true){
                db.query(sqlRequest3, function(err, result, fields){
                    if(err) throw err;
                    resolve({ message : 'Like annulé!' })
                })
            }
        })
    };

    createComment(sqlTab){
        let sqlRequest = 'INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?)';
        sqlRequest = mysql.format(sqlRequest, sqlTab);
        return new Promise((resolve) =>{
            db.query(sqlRequest, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Le nouveau commentaire a bien été créé !'})
            })
        })
    };

    modifyComment(sqlTab1, sqlTab2){
        let sqlRequest1 = 'SELECT * FROM comments where id = ?';
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        return new Promise((resolve) =>{
            db.query(sqlRequest1, function (err, result, fields){
                if (err) throw err;
                if(sqlTab2[2] === result[0].userId){
                    let sqlRequest2 = 'UPDATE comments SET comContent = ? WHERE id = ? AND userId = ?';
                    sqlRequest2 = mysql.format(sqlRequest2, sqlTabs);
                    db.query(sqlRequest2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Le commentaire a bien été modifié.'});
                    })
                } else {
                    reject({error: 'La fonction est indisponible.'});
                }
            })
        });
    };

    deleteComment(sqlTab1, sqlTab2){
        let sqlRequest1 = 'SELECT * FROM comments where id = ?';
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        return new Promise((resolve, reject) =>{
            db.query(sqlRequest1, function (err, result, fields){
                if (err) throw err;
                if(sqlTab2[1] === result[0].userId){
                    let sqlRequest2 = 'DELETE FROM comments WHERE id = ? AND userId = ?';
                    sqlRequest2 = mysql.format(sqlRequest2, sqlTab2);
                    db.query(sqlRequest2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Le commentaire a bien été supprimé !'});
                    })
                } else {
                    reject({error: 'La fonction est indisponible.'});
                }
            });
        })
    };

    getAllPosts(){
        let sqlRequest = "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(DATE(posts.date), '%e/%m/%y') AS date, TIME(posts.date) AS time, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY date DESC";
        return new Promise((resolve) =>{
            db.query(sqlRequest, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            })
        })
    };

    getComments(sqlTab){
        let sql= "SELECT comments.comContent, DATE_FORMAT(comments.date, '%e/%m/%y à %k:%i:%s') AS date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id WHERE postId = ? ORDER BY date";
        sql = mysql.format(sql, sqlTab);
        return new Promise((resolve) =>{
            db.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        })
    };


    getAllLikes(){
        let sql = 'SELECT * FROM likes';
        return new Promise((resolve) =>{
            db.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    };

};

module.exports = PostModel;