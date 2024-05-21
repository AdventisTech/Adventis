const express = require('express');
const router = express.Router();
const userController = require('../controller/location');

router.post('/location', userController.locationDetailspost);
router.get('/location', userController.locationDetailsget);
router.put('/locationupdate/:id',userController.locationDetailsupdate);
router.delete('/locationdelete/:id',userController.locationDetailsdelete);

module.exports = router;