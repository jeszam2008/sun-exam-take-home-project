const express = require('express');
const router = express.Router();
const {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    upvoteArticle
} = require('../controllers/articleController');


router.route('/').post(createArticle).get(getArticles);
router.route('/:id').get(getArticleById);
router.route('/:id').put(updateArticle).delete(deleteArticle);

router.route('/upvotes/:id').put(upvoteArticle);

module.exports = router;