// const express = require('express');
// const router = express.Router();
// const userController = require('../controller/contacts');

// router.post('/Contacts', userController.CondactDetailspost);
// router.get('/Contacts', userController.CondactDetailsget);
// router.put('/Contactsupdate/:id',userController.CondactDetailsupdate);
// router.delete('/Contactsdelete/:id',userController.CondactDetailsdelete)

// module.exports = router;



// attendance.route.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const AttendanceController = require('../controller/excel');

const upload = multer();

router.post('/upload', upload.single('file'), AttendanceController.uploadAttendance);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const attendanceController = require('../controller/excel');

// router.post('/upload', attendanceController.uploadAttendance);

// module.exports = router;
