const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

//App Routes
router.get('/', bookController.homepage);
router.get('/book/:id', bookController.exploreBook);
router.post('/search',bookController.searchBook);

router.get('/explore-more-books', bookController.exploreMore);
router.get('/explore-random', bookController.exploreRandom);
router.get('/submit-book', bookController.submitBook);
router.post('/submit-book', bookController.submitBookOnPost);

module.exports = router;