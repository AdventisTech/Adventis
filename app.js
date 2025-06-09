const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const parser = require('body-parser');
const path = require('path');require('./scheduler');


const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const upload = multer();
require('dotenv').config();

const userRoute = require('./route/Registration');
const projectRoute = require('./route/projects');
const UserprojectRoute = require('./route/Userprojects');
const Usercontacts = require('./route/contacts');
const opportunity = require('./route/opportunity');
const projectRoute1 = require('./route/projects1');
const attendanceRouter = require('./route/excel');
const ratingRouter = require('./route/rating');
const ManagerratingRouter = require('./route/managerrating');
const locationRouter = require('./route/location');
const TaskRoute = require('./route/billable');
const UserTime = require('./route/usertime');
const ExcelJS = require('exceljs');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(parser.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(upload.any());

app.use((req, res, next) => {

  next();
});

app.use('', express.static(path.join(__dirname, 'time-sheet')));

app.use('/api/user', userRoute);
app.use('/api/user', projectRoute);
app.use('/api/user', UserprojectRoute);
app.use('/api/user', Usercontacts);
app.use('/api/user', opportunity);
app.use('/api/user', projectRoute1);
app.use('/api/user', ratingRouter);
app.use('/api/user', ManagerratingRouter);
app.use('/api/user', locationRouter);
app.use('/api/user', TaskRoute);
app.use('/api/user', UserTime);

wss.on('connection', (socket) => {
  console.log('A user connected');


  fetchDataAndSend(socket);

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });


  socket.on('close', () => {
    console.log('A user disconnected');
  });
});

async function fetchDataAndSend(socket) {
  try {
    const result = await assetModel.find();

    socket.send(JSON.stringify(result));
  } catch (error) {

  }
}



const excelDataSchema = new mongoose.Schema({}, { strict: false });
const ExcelData = mongoose.model('ExcelData', excelDataSchema);

app.post('/api/user/upload', async (req, res) => {
  try {
    const dataToStore = req.body;

    if (!dataToStore || dataToStore.length === 0) {
      return res.status(400).json({ success: false, message: 'No data provided.' });
    }

    await ExcelData.insertMany(dataToStore);

    return res.status(200).json({ success: true, message: 'Data uploaded successfully.' });
  } catch (error) {

    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});



mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = app;
