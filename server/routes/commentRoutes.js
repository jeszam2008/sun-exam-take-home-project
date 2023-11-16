const express = require('express');
const router = express.Router();
const {
    getComments,
    createComment
} = require('../controllers/commentController');


router.route('/').post(createComment).get(getComments);

module.exports = router;