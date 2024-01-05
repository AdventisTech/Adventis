// const express = require('express');
// const router = express.Router();
// const userController = require('../controller/Registration');

// router.post('/Register',userController.RegisterDetails);

// router.post('/Login',userController.LoginDetails);
// router.post('/Forgotpassword',userController.forgotPassword);
// router.get('/Login', userController.LoginDetailsget);
// router.put('/userupdate/:id',userController.userDetailsupdate);

// router.delete('/userdelete/:id',userController.userDetailsdelete)

// module.exports = router;



const express = require('express');
const router = express.Router();
const userController = require('../controller/Registration');
const fileUpload = require('express-fileupload');

// Use express-fileupload middleware for handling file uploads
router.use(fileUpload());

router.post('/Register', userController.RegisterDetails);
router.post('/Login', userController.LoginDetails);
router.post('/Forgotpassword', userController.forgotPassword);
router.get('/Login', userController.LoginDetailsget);

router.put('/userupdate/:id', userController.userDetailsupdate);

module.exports = router;







// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const userController = require('../controller/Registration');



// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// router.post('/Register', userController.RegisterDetails);
// router.post('/Login', userController.LoginDetails);

// router.post('/Forgotpassword', userController.forgotPassword);
// router.get('/Login', userController.LoginDetailsget);

// router.put('/userupdate/:id', upload.single('profilePicture'), userController.userDetailsupdate);




// router.delete('/userdelete/:id', userController.userDetailsdelete);

// module.exports = router;
