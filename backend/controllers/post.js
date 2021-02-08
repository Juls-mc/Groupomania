const db = require('../db.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const PostModel = require ('../models/post.js');

let postModel = new PostModel();


exports.createPost = (req, res, next) => {
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlTab = [userId, title, content];
    postModel.createPost(sqlTab)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
};

exports.modifyPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.id;
    let sqlTab1 = [postId];
    let sqlTab2 = [title, content, postId, userId];
    postModel.modifyPost(sqlTab1, sqlTab2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
};

exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let sqlTab1 = [postId];
    let sqlTab2 = [postId, userId];
    postModel.deletePost(sqlTab1, sqlTab2)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
};

exports.createComment = (req, res, next) => {
    let postId = req.params.id;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlTab = [userId, postId, content];
    postModel.createComment(sqlTab)
        .then((response) =>{
            res.status(201).json(JSON.stringify(response));
        })
};

exports.modifyComment = (req, rest, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let content = req.body.content;
    let commentId = req.params.id;
    let sqlTab1 = [commentId];
    let sqlTab2 = [content, commentId, userId];
    postModel.modifyPost(sqlTab1, sqlTab2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
};

exports.deleteComment= (req, res, next) => {
    let commentId = req.params.id;
    let sqlTab = [commentId];
    postModel.deleteComment(sqlTab)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
};

exports.postLike = (req, res, next) => {
    let userId = req.body.userId;
    let nbLikes = req.body.nbLikes;
    let postId = req.body.postId;
    let sqlTab1 = [postId, userId];
    let sqlTab2 = [nbLikes,postId];
    postModel.postLike(sqlTab1, sqlTab2, req.body.liked)
        .then((response) =>{
            res.status(201).json(JSON.stringify(response))
        })
};

exports.getAllLikes = (req, res, next) => {
    postModel.getAllLikes()
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
};

exports.getAllPosts = (req, res, next) => {
    postModel.getAllPosts()
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
};

exports.getComments = (req, res, next) => {
    let postId = req.params.id;
    let sqlTab = [postId];
    postModel.getComments(sqlTab)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
};