const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const moderationRoutes = require('./routes/moderation');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(mongoSanitize()); 
app.use(helmet()); 
app.use(bodyParser.json());


app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/moderation', moderationRoutes);

module.exports = app;