// const express = require('express');

// const router = express.Router();
// const AppController = require('../controllers/AppController');

// router.get('/status', AppController.getStatus);
// router.get('/stats', AppController.getStats);

// module.exports = router;

const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');
const FilesController = require('../controllers/FilesController');

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/files', FilesController.postUpload);

module.exports = router;
