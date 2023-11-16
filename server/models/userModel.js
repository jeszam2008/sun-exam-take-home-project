const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    'Username': {
        type: String,
        required: true,
        unique: true
    },
    'isLoggedIn': {
        type: Boolean
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);