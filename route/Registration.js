

const express = require('express');
const router = express.Router();
const userController = require('../controller/Registration');
const fileUpload = require('express-fileupload');


router.use(fileUpload());

router.post('/Register', userController.RegisterDetails);
router.post('/Login', userController.LoginDetails);
router.post('/Forgotpassword', userController.forgotPassword);
router.get('/Login', userController.LoginDetailsget);

router.put('/userupdate/:id', userController.userDetailsupdate);

module.exports = router;

