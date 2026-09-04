const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');

router.get('/:phone', accessController.checkAccess);

module.exports = router;
