const asyncHandler = require('express-async-handler');


const getArticles = asyncHandler(async (req, res) => {
    res.status(200).json({ "status": '00', "data": [], "message": "Fetch Articles" });
});

const createArticle = asyncHandler(async (req, res) => {
    res.status(201).json({ "status": '00', "data": [], "message": "Article has been created" });
});

const updateArticle = asyncHandler(async (req, res) => {
    res.status(200).json({ "status": '00', "data": [], "message": "Article has been updated" });
});

const deleteArticle = asyncHandler(async (req, res) => {
    res.status(200).json({ "status": '00', "data": [], "message": "Article has been deleted" });
});

const getArticleComments = asyncHandler(async (req, res) => {
    res.status(200).json({ "status": '00', "data": [], "message": "Fetch Article Comments" });
});

const createArticleComments = asyncHandler(async (req, res) => {
    res.status(201).json({ "status": '00', "data": [], "message": "Article's comment has been added" });
});

const upvoteArticle = asyncHandler(async (req, res) => {
    res.status(200).json({ "status": '00', "data": [], "message": "Article has been upvoted" });
});


module.exports = {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleComments,
    createArticleComments,
    upvoteArticle
}