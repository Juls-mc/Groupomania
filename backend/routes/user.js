const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');


    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.get('/', auth, userCtrl.displayProfile);
    router.delete('/', auth, userCtrl.deleteUser);
    router.put('/', auth, userCtrl.modifyProfile);


module.exports = router;