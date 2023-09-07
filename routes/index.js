// const express = require('express');

// const router = express.Router();
// const AppController = require('../controllers/AppController');

// router.get('/status', AppController.getStatus);
// router.get('/stats', AppController.getStats);

// module.exports = router;

const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');
<<<<<<< HEAD
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);
=======
const FilesController = require('../controllers/FilesController');

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/files', FilesController.postUpload);

>>>>>>> ee23792c92044dd4db9613ce677badcb0c6a3cbe
module.exports = router;
