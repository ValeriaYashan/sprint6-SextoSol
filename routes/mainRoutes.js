const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController')

router.get('/', mainController.index);
router.get('/sobrenosotros', mainController.sobrenosotros);
router.get('/service', mainController.service);


module.exports = router;