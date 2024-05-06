const express = require('express');
const router = express.Router();
const ratingController = require('../controller/managerrating');

router.post('/ManagerRatingpost', ratingController.ratingDetails);
router.get('/ManagerRatingget', ratingController.ratingDetailsget);
// router.put('/Projectupdate/:id',userController.projectDetailsupdate);
// router.delete('/Projectdelete/:id',userController.projectDetailsdelete)

module.exports = router;
