const express = require('express');
const router = express.Router();
const {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleComments,
    createArticleComments,
    upvoteArticle
} = require('../controllers/articleController');


router.route('/').post(createArticle);
router.route('/:id?').get(getArticles);
router.route('/:id').put(updateArticle).delete(deleteArticle);

router.route('/upvotes').post(upvoteArticle);
router.route('/comments').get(getArticleComments);
router.route('/comments').post(createArticleComments);