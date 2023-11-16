const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel');


const getArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find();
    res.status(200).json({ "status": '00', "data": articles, "message": "Fetch Articles" });
});

const getArticleById = asyncHandler(async (req, res) => {
    const id = req.params['id'];

    const articles = await Article.findById(id);
    res.status(200).json({ "status": '00', "data": articles, "message": "Get article by ID" });
});

const createArticle = asyncHandler(async (req, res) => {
    const userID = req.headers['userid'];
    const title = req.body['ArticleTitle'];
    const content = req.body['ArticleContent'];

    const article = await Article.create({
        'UserID': userID,
        'Title': title,
        'Content': content,
        'Upvotes': 0,
        'DownVotes': 0
    });
    res.status(201).json({ "status": '00', "data": [article], "message": "Article has been created" });

});

const updateArticle = asyncHandler(async (req, res) => {
    const id = req.params['id'];
    const title = req.body['ArticleTitle'];
    const content = req.body['ArticleContent'];

    const article = await Article.findById(id);

    if (!article) {
        res.status(400)
        throw new Error('Article not found');
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, {
        'Title': title,
        'Content': content,
    });

    res.status(200).json({ "status": '00', "data": [updatedArticle], "message": "Article has been updated" });
});

const deleteArticle = asyncHandler(async (req, res) => {
    const id = req.params['id'];
    const article = await Article.findById(id);

    if (!article) {
        res.status(400)
        throw new Error('Article not found');
    }

    await Article.findByIdAndDelete(id);

    res.status(200).json({ "status": '00', "data": [{ id }], "message": "Article has been deleted" });
});



const upvoteArticle = asyncHandler(async (req, res) => {
    const id = req.params['id'];
    const article = await Article.findById(id);

    if (!article) {
        res.status(400)
        throw new Error('Article not found');
    }

    const updatedArticle = await Article.findByIdAndUpdate(id, {
        'Upvotes': parseInt(article.Upvotes) + 1
    });

    res.status(200).json({ "status": '00', "data": [updatedArticle], "message": "Article has been upvoted" });
});


module.exports = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    upvoteArticle
}