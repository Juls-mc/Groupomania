const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const moderateCtrl = require('../controllers/moderate');


    router.get('/comments', auth, moderateCtrl.getAllComments);
    router.get('/posts', auth, moderateCtrl.getAllPosts);
    router.delete('/comment/:id', auth, moderateCtrl.deleteComment);
    router.delete('/post/:id', auth, moderateCtrl.deletePost);


module.exports = router;