// storageService.js

// const fs = require('fs').promises;
// const path = require('path');

// module.exports = {
//   saveFile: async (fileData, destination) => {
//     try {
//       // Generate a unique filename by appending the current timestamp and the original file extension
//       const filename = Date.now() + '-' + fileData.originalname;

//       // Convert ArrayBuffer to Buffer
//       const buffer = Buffer.from(fileData.buffer);

//       // Save the file to the specified destination
//       const filePath = path.join(destination, filename);

//       await fs.writeFile(filePath, buffer);

//       return filePath;
//     } catch (error) {
//       throw error;
//     }
//   },
// };



const multer = require('multer');
const path = require('path');

// Set up disk storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  saveFile: async (file, destination) => {
    try {
      // Handle the file saving logic using multer storage
      const uploadPromise = new Promise((resolve, reject) => {
        upload.single('profilePicture')(file, null, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(file.filename);
          }
        });
      });

      const filename = await uploadPromise;

      // Return the file path
      return path.join(destination, filename);
    } catch (error) {
      throw error;
    }
  },
};

