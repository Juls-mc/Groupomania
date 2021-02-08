const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');


    router.get('/', auth, postCtrl.getAllPosts);
    router.post('/', auth, multer, postCtrl.createPost);
    router.put('/:id', auth, multer, postCtrl.modifyPost);
    router.delete('/:id', auth, postCtrl.deletePost);

    router.get('/likes', auth, postCtrl.getAllLikes);
    router.post('/:id/like', auth, postCtrl.postLike);

    router.get('/:id/comments', auth, postCtrl.getComments);
    router.post('/:id/comments', auth, postCtrl.createComment);
    router.put('/comments/:id', auth, postCtrl.modifyComment);
    router.delete('/comments/:id', auth, postCtrl.deleteComment);



module.exports = router;