const db = require('../db.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require ('../models/user.js');

let userModel = new UserModel();

exports.signup = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    bcrypt.hash(password, 10)
        .then (hash => {
            let sqlTabs = [lastName, firstName, email, hash];
            userModel.signup(sqlTabs)
                .then((response) =>{
                    res.status(201).json(JSON.stringify(response))
                })
                .catch((error) =>{
                    console.error(error);
                    res.status(400).json({error})
                })
        })
        .catch(error => res.status(500).json(error))
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let sqlTab = [email];
    userModel.login(sqlTab, password)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
};

exports.displayProfile = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlTab = [userId];
    userModel.displayProfile(sqlTab)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
};

exports.modifyProfile = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let sqlTab = [firstName, lastName, email, userId];
    userModel.modifyProfile(sqlTab)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
};

exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlTab = [userId];
    userModel.deleteUser(sqlTab)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
};