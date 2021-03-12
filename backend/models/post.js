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

    modifyPost(sqlTab1, sqlTab2){ // modifier uniquement ses propres posts
        let sqlRequest1 = 'SELECT * FROM posts where id = ?';
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        return new Promise((resolve) =>{
            db.query(sqlRequest1, function (err, result, fields){
                if (err) throw err;
                if(sqlTab2[3] === result[0].userId){
                    let sqlRequest2 = 'UPDATE posts SET title = ?, content = ? WHERE id = ? AND userId = ?'; // requête UPDATE pour modifier le post
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

    deletePost(sqlTab1, sqlTab2){ // supprimer uniquement ses propres posts
        let sqlRequest1 = 'SELECT * FROM posts where id = ?';
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        return new Promise((resolve, reject) =>{
            db.query(sqlRequest1, function (err, result, fields){
                if (err) throw err;
                if(sqlTab2[1] === result[0].userId){
                    let sqlRequest2 = 'DELETE FROM posts WHERE id = ? AND userId = ?'; // requête DELETE pour supprimer le post 
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

    postLike(sqlTab1, sqlTab2, liked){ // ajouter ou enlever un like
        let sqlRequest1 = 'INSERT INTO likes VALUES (NULL, ?, ?)'; // requête pour ajouter un like
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        let sqlRequest2 = 'UPDATE posts SET likes = ? WHERE id = ?';
        sqlRequest2 = mysql.format(sqlRequest2, sqlTab2);
        let sqlRequest3 = 'DELETE FROM likes WHERE postId = ? AND userId = ?'; // requête pour supprimer un like
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

    createComment(sqlTab){ // créer un commentaire
        let sqlRequest = 'INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?)';
        sqlRequest = mysql.format(sqlRequest, sqlTab);
        return new Promise((resolve) =>{
            db.query(sqlRequest, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Le nouveau commentaire a bien été créé !'})
            })
        })
    };

    modifyComment(sqlTab1, sqlTab2){ // modifier uniquement ses propres commentaires
        let sqlRequest1 = 'SELECT * FROM comments where id = ?';
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        return new Promise((resolve) =>{
            db.query(sqlRequest1, function (err, result, fields){
                if (err) throw err;
                if(sqlTab2[2] === result[0].userId){
                    let sqlRequest2 = 'UPDATE comments SET comContent = ? WHERE id = ? AND userId = ?'; // requête UPDATE pour modifier le commentaire
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

    deleteComment(sqlTab1, sqlTab2){ // supprimer uniquement ses propres commentaires
        let sqlRequest1 = 'SELECT * FROM comments where id = ?';
        sqlRequest1 = mysql.format(sqlRequest1, sqlTab1);
        return new Promise((resolve, reject) =>{
            db.query(sqlRequest1, function (err, result, fields){
                if (err) throw err;
                if(sqlTab2[1] === result[0].userId){
                    let sqlRequest2 = 'DELETE FROM comments WHERE id = ? AND userId = ?'; // requête DELETE pour supprimer le commentaire
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

    getAllPosts(){ // pour afficher tous les posts
        let sqlRequest = "SELECT p.id, p.userId, p.title, p.content, DATE_FORMAT(DATE(p.date), '%e/%m/%y') AS date, TIME(p.date) AS time, p.likes, u.lastName, u.firstName FROM posts p JOIN users u ON p.userId = u.id ORDER BY date DESC";
        return new Promise((resolve) =>{
            db.query(sqlRequest, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            })
        })
    };

    getComments(sqlTab){ // pour affcher tous les commentaires
        let sql= "SELECT c.comContent, DATE_FORMAT(c.date, '%e/%m/%y à %k:%i:%s') AS date, c.id, c.userId, u.firstName, u.lastName FROM comments c JOIN users u ON c.userId = u.id WHERE postId = ? ORDER BY date";
        sql = mysql.format(sql, sqlTab);
        return new Promise((resolve) =>{
            db.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve(result);
            })
        })
    };


    getAllLikes(){ // afficher tous les likes
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