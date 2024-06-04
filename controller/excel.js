const Attendance = require('../models/excel');
const xlsToJson = require('xls-to-json-lc');

exports.uploadAttendance = async (req, res) => {
  try {

    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    // Convert XLS file to JSON
    const result = await xlsToJson({
      input: req.file.path,
      output: null,
    });



    // Ensure data is present
    if (!Array.isArray(result) || result.length === 0) {
      return res.status(400).json({ success: false, message: 'No data found in the file.' });
    }

    // Map JSON data to match the schema fields
    const attendanceData = result.map(item => ({
      date: item['Attendance Date'] || '',
      department: item['Department'] || '',
      sno: item['SNo'] || '',
      eCode: item['E. Code'] || '',
      name: item['Name'] || '',
      shift: item['Shift'] || '',
      inTime: item[' InTime'] || '',
      outTime: item[' OutTime'] || '',
      workDuration: item['Work Dur.'] || '',
      OT: item['OT'] || '',
      totalDuration: item['Tot.  Dur.'] || '',
      status: item['Status'] || '',
      remarks: item['Remarks'] || ''
    }));



    // Insert data into MongoDB
    await Attendance.insertMany(attendanceData);

    // Send response
    res.json({ success: true, message: 'Data uploaded successfully' });
  } catch (err) {

    res.status(500).json({ success: false, message: 'Error uploading data to MongoDB' });
  }
};


//   uploadAttendance: async (req, res) => {

//     try {
//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ success: false, message: 'No files were uploaded.' });
//       }

//       const file = req.files[0]; // Assuming only one file is uploaded

//       // Convert XLS file to JSON using promise
//       const result = await xlsToJson({
//         input: file.tempFilePath,
//         output: null,
//       });

//       // Insert data into MongoDB
//       await Attendance.insertMany(result);

//       // Send response
//       res.json({ success: true, message: 'Data uploaded successfully' });
//     } catch (err) {

//       res.status(500).json({ success: false, message: 'Error uploading data to MongoDB' });
//     }
//   }
