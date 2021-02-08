const db = require('../db.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const ModerateModel = require ('../models/moderate.js');

let moderateModel = new ModerateModel();


exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const moderate = decodedToken.moderation; //
    console.log(moderate);
    if(moderate === 1){
        let postId = req.params.id;
        let sqlTab = [postId];
        moderateModel.deletePost(sqlTab)
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
    const moderate = decodedToken.moderation;
    if(moderate === 1){
        let commentId = req.params.id;
        let sqlTab = [commentId];
        moderateModel.deleteComment(sqlTab)
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
    const moderate = decodedToken.moderation;
    if(moderate === 1){
        moderateModel.getAllPosts()
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
    const moderate = decodedToken.moderation;
    if(moderate === 1){
        moderateModel.getAllComments()
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'La requête est non authorisée'})
    }
};