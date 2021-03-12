const db = require('../db.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const ModerationModel = require ('../models/moderation.js');

let moderationModel = new ModerationModel();


exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const moderation = decodedToken.moderation; //
    console.log(moderation);
    if(moderation === 1){
        let postId = req.params.id;
        let sqlTab = [postId];
        moderationModel.deletePost(sqlTab)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'La requête est non authorisée'})
    }
};

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const moderation = decodedToken.moderation;
    if(moderation === 1){
        let commentId = req.params.id;
        let sqlTab = [commentId];
        moderationModel.deleteComment(sqlTab)
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'La requête est non authorisée'})
    }
};
 
exports.getAllPosts = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const moderation = decodedToken.moderation;
    if(moderation === 1){
        moderationModel.getAllPosts()
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'La requête est non authorisée'})
    }
};

exports.getAllComments = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const moderation = decodedToken.moderation;
    if(moderation === 1){
        moderationModel.getAllComments()
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'La requête est non authorisée'})
    }
};
