const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    'CommentatorID': {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User not found'],
        ref: 'User'
    },
    'ArticleID': {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Article ID not found'],
        ref: 'Article'
    },
    'Comment': {
        type: String,
        required: [true, 'Comment not provided']
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);