// const express = require('express');
// const app = express();
// const parser = require('body-parser');
// const path = require('path');
// const cors = require('cors');
// const multer = require('multer');
// const upload = multer();

// const userRoute = require('./route/Registration');
// const projectRoute = require('./route/projects');
// const UserprojectRoute = require('./route/Userprojects');
// const Usercontacts = require('./route/contacts');
// const opportunity = require('./route/opportunity');

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(parser.json());
// app.use(express.json());
// app.use(cors());
// app.use(upload.any());

// app.use((req,res,next)=>{

//     next();
// })
// app.use('',express.static(path.join(__dirname,'time-sheet')));

// app.use('/api/user',userRoute);
// app.use('/api/user',projectRoute);
// app.use('/api/user',UserprojectRoute);
// app.use('/api/user',Usercontacts);
// app.use('/api/user',opportunity);
// module.exports = app;


const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const parser = require('body-parser');
const path = require('path');
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
require('./scheduler');
// Import ExcelJS for reading Excel files
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
// app.use('/api/user', attendanceRouter);

// WebSocket connection event
wss.on('connection', (socket) => {
  console.log('A user connected');

  // Fetch data from MongoDB and send it to the connected client
  fetchDataAndSend(socket);

  // Handle WebSocket messages (if needed)
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Handle disconnection
  socket.on('close', () => {
    console.log('A user disconnected');
  });
});

async function fetchDataAndSend(socket) {
  try {
    const result = await assetModel.find();
    // Send data to the connected client
    socket.send(JSON.stringify(result));
  } catch (error) {

  }
}


// Handle file upload
const excelDataSchema = new mongoose.Schema({}, { strict: false });
const ExcelData = mongoose.model('ExcelData', excelDataSchema);

app.post('/api/user/upload', async (req, res) => {
  try {
    const dataToStore = req.body;

    if (!dataToStore || dataToStore.length === 0) {
      return res.status(400).json({ success: false, message: 'No data provided.' });
    }

    // Store data in MongoDB
    await ExcelData.insertMany(dataToStore);

    return res.status(200).json({ success: true, message: 'Data uploaded successfully.' });
  } catch (error) {

    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});


// app.post('/api/user/upload', async (req, res) => {
//   try {
//     const dataToStore = req.body;

//     if (!dataToStore || dataToStore.length === 0) {
//       return res.status(400).json({ success: false, message: 'No data provided.' });
//     }

//     const formattedData = {
//       Company: dataToStore[1]['__EMPTY_2'], // Assuming Company is in the second object
//       financeyear: dataToStore[0]['Daily Attendance Report (Basic Report)'], // Assuming financeyear is in the first object
//       'Attendance Date': dataToStore[3]['__EMPTY_3'], // Assuming Attendance Date is in the fourth object
//       Department: dataToStore[3]['__EMPTY_3'], // Assuming Department is in the fourth object
//       SNo: parseInt(dataToStore[5]['__EMPTY_1']), // Assuming SNo is in the sixth object, parse it to an integer
//       Name: dataToStore[5]['__EMPTY_2'], // Assuming Name is in the sixth object
//       Shift: dataToStore[5]['__EMPTY_4'], // Assuming Shift is in the sixth object
//       InTime: dataToStore[5]['__EMPTY_6'], // Assuming InTime is in the sixth object
//       OutTime: dataToStore[5]['__EMPTY_7'], // Assuming OutTime is in the sixth object
//       'Work Dur': dataToStore[5]['__EMPTY_9'], // Assuming Work Dur is in the sixth object
//       OT: dataToStore[5]['__EMPTY_10'], // Assuming OT is in the sixth object
//       'Tot. Dur.': dataToStore[5]['__EMPTY_11'], // Assuming Tot. Dur. is in the sixth object
//       Status: dataToStore[5]['__EMPTY_12'], // Assuming Status is in the sixth object
//       Remarks: dataToStore[5]['__EMPTY_14'], // Assuming Remarks is in the sixth object
//     };

//     // Store the formatted data in MongoDB
//     await ExcelData.create(formattedData);

//     return res.status(200).json({ success: true, message: 'Data uploaded successfully.' });
//   } catch (error) {

//     return res.status(500).json({ success: false, message: 'Internal server error.' });
//   }
// });




// app.post('/api/user/upload', async (req, res) => {
//   try {
//     const dataToStore = req.body;

//     if (!dataToStore || dataToStore.length === 0) {
//       return res.status(400).json({ success: false, message: 'No data provided.' });
//     }

//     // Combine all data into a single document
//     const combinedData = Object.assign({}, ...dataToStore);

//     // Store combined data in MongoDB
//     await ExcelData.create(combinedData);

//     return res.status(200).json({ success: true, message: 'Data uploaded successfully.' });
//   } catch (error) {

//     return res.status(500).json({ success: false, message: 'Internal server error.' });
//   }
// });

mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = app; // Export the Express app
