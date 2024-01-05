const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer'); // Add this line

const userRoute = require('./route/Registration');
const projectRoute = require('./route/projects');
const UserprojectRoute = require('./route/Userprojects');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(parser.json());
app.use(express.json());
// app.use(cors());
// Specify CORS options
const corsOptions = {
    origin: 'https://cstimesheet.onrender.com/api/user/Register', // Update this with your frontend's actual URL
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// Set up Multer middleware for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for handling file uploads
const upload = multer({ storage: storage });
app.use(upload.any());
app.use('/api/user', userRoute);
app.use('/api/user', projectRoute);
app.use('/api/user', UserprojectRoute);

module.exports = app;
