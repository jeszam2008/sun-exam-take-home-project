const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel');

const getComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find();
    res.status(200).json({ "status": '00', "data": comments, "message": "Fetch Comments" });
});

const createComment = asyncHandler(async (req, res) => {
    const userID = req.headers['userid'];
    const articleID = req.body['ArticleID'];
    const comment = req.body['Comment'];

    const comments = await Comment.create({
        'CommentatorID': userID,
        'ArticleID': articleID,
        'Comment': comment
    });

    res.status(201).json({ "status": '00', "data": [comments], "message": "Comment has been added" });
});

module.exports = {
    getComments,
    createComment
}