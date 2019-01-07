const express = require('express');
const router = express.Router();

const query_controller = require('../controllers/query');

router.post('/post', query_controller.query_post);
router.get('/view_all', query_controller.query_view_all);
router.post('/answer', query_controller.query_answer);
router.get('/view_by', query_controller.query_view_by);
router.get('/search_ques', query_controller.query_search_ques);
module.exports = router;