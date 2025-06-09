const express = require('express');
const router = express.Router();
const usertimeController = require('../controller/usertime');

router.post('/UserTime', usertimeController.UserTimeDetailspost);
router.get('/UserTimeget', usertimeController.UserTimeDetailsget);
router.get('/UserTimeget1/:userid', usertimeController.UserTimeDetailsByUserId);
router.get('/UserTimeget2/:userid', usertimeController.UserTimeDetailsByUserId1);
router.get('/particulardate', usertimeController.onlyparticulardate);
router.put('/UserTimeupdate/:id',usertimeController.UserTimeDetailsupdate);
router.delete('/UserTimedelete/:id',usertimeController.UserTimeDetailsdelete)

module.exports = router;