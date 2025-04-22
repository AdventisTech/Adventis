const express = require('express');
const router = express.Router();
const userController = require('../controller/Userproject');

router.post('/UserProject', userController.assetDetails);
router.get('/UserProject', userController.assetDetailsget);
router.get('/UserProject1', userController.assetDetailsget1);
router.get('/UserProject2', userController.assetDetailsget2);
router.get('/UserProject3', userController.assetDetailsget3);
router.get('/UserProject4', userController.assetDetailsget4);
router.put('/UserProjectupdate/:id',userController.userprojectupdate);
router.delete('/UserProjectdelete/:id',userController.userprojectdelete)

module.exports = router;