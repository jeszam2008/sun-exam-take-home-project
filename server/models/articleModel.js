const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    'UserID': {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User not found'],
        ref: 'User'
    },
    'Title': {
        type: String,
        required: [true, 'Title not found']
    },
    'Content': {
        type: String,
        required: [true, 'Content not found']
    },
    'Upvotes': {
        type: Number
    },
    'Downvotes': {
        type: Number
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);