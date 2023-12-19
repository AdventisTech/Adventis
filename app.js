const express = require('express');
const app = express();
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');

const userRoute = require('./route/Registration');
const projectRoute = require('./route/projects');
const UserprojectRoute = require('./route/Userprojects');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(parser.json());
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    console.log("app.js file",__dirname);
    next();
})
app.use('',express.static(path.join(__dirname,'time-sheet')));


app.use('/api/user',userRoute);
app.use('/api/user',projectRoute);
app.use('/api/user',UserprojectRoute);

module.exports = app;