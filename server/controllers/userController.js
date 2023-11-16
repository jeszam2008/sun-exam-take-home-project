const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const loginUser = asyncHandler(async (req, res) => {
    const username = req.body['Username'];

    if (username) {
        let user = await User.findOne({
            'Username': username,
        });

        if (user) {
            // If exist, user can now logged in
            const _id = user._id;
            user = await User.findByIdAndUpdate(_id, {
                'isLoggedIn': true,
            });

            res.status(200).json({ "status": '00', "data": [{ userID: user._id, username: user.Username }], "message": "User logged in" });
        } else {
            // If not exist, user will be created and logged in after

            user = await User.create({
                'Username': username,
                'isLoggedIn': true
            });

            res.status(200).json({ "status": '00', "data": [{ userID: user._id, username: user.Username }], "message": "User logged in" });
        }

    } else {
        res.status(200);
        throw new Error('Username not provided');
    }

});


const logoutUser = asyncHandler(async (req, res) => {
    const userID = req.headers['userid'];

    if (userID) {
        await User.findByIdAndUpdate(userID, {
            'isLoggedIn': false,
        });

        res.status(200).json({ "status": '00', "data": [], "message": "User logged out" });

    } else {
        res.status(200);
        throw new Error('User not found');
    }

});


module.exports = {
    loginUser,
    logoutUser
}