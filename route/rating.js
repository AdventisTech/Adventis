const express = require('express');
const router = express.Router();
const ratingController = require('../controller/rating');

router.post('/Ratingpost', ratingController.ratingDetails);
router.get('/Ratingget', ratingController.ratingDetailsget);
// router.put('/Projectupdate/:id',userController.projectDetailsupdate);
// router.delete('/Projectdelete/:id',userController.projectDetailsdelete)

module.exports = router;
