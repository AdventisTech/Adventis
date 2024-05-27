const express = require('express');
const router = express.Router();
const userController = require('../controller/Registration');

router.post('/Register',userController.RegisterDetails);

router.post('/4391',userController.LoginDetails);
router.post('/Forgotpassword',userController.forgotPassword);
router.get('/4391', userController.LoginDetailsget);
router.put('/userupdate/:id',userController.userDetailsupdate);

router.delete('/userdelete/:id',userController.userDetailsdelete)

module.exports = router;