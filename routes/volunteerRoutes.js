// backend/routes/volunteerRoutes.js
const express = require('express');
const router = express.Router();
const { apply } = require('../controllers/volunteerController');

router.post('/apply', apply);

module.exports = router;
