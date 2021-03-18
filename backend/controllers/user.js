const db = require('../db.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const UserModel = require ('../models/user.js');

const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(6)
    .is().max(30)
    .has().lowercase()
    .has().digits()
    .has().not().symbols()
    .has().not().spaces();

let userModel = new UserModel();

exports.signup = (req, res, next) => {
    if (!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) {
        return res.status(400).json({message: 'Le mot de passe doit contenir une une minuscule et un chiffre. Sa longueur doit être entre 6 et 30 caractères'});
    } else if (emailValidator.validate(req.body.email) || passwordSchema.validate(req.body.password)) {
        const maskedMail = MaskData.maskEmail2(req.body.email);
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