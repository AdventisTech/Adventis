const UserModel = require('../models/Registration');
const bcrypt = require('bcryptjs');
// const multer = require('multer');
// const path = require('path');
const userprojectsModel = require('../models/userprojects');
// const storageService = require('../models/storageService'); 
// const fs = require('fs').promises;
const debug = require('debug')('app:controller:userDetailsupdate');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname); 
//     },
//   });
  
// const storage = multer.memoryStorage(); // Use memory storage for handling file uploads

// const upload = multer({ storage: storage });
module.exports = {
  RegisterDetails: async (req, res) => {
    console.log('data', req.body);
    try {
      const { EmployeeId, Name, Designation, Salary, Emailaddress, Password } = req.body;

      // Check if a user with the same EmployeeId already exists
      const existingUser = await UserModel.findOne({ EmployeeId });

      if (existingUser) {
        // Handle duplicate EmployeeId
        return res.status(400).json({ error: 'EmployeeId is already in use' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);

      const result = new UserModel({
        EmployeeId: EmployeeId,
        Name: Name,
        Designation: Designation,
        Salary: Salary,
        Emailaddress: Emailaddress,
        Password: hashedPassword,
      });

      await result.save();

      res.status(201).json({ result, message: 'Successfully Registered' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

// RegisterDetails : async (req, res) => {
//   console.log('data',req.body);
//   try {
//     // Handle file upload
//     upload.single('profilePicture')(req, res, async function (err) {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Error uploading file' });
//       }

//       const { EmployeeId, Name, Designation, Salary, Emailaddress, Password } = req.body;
//       // const profilePicture = req.file; // Access the file information
//       //       console.log(req.file)
//       //       console.log(req.body)
//             const profilePicture = req.file ? req.file : null;
//       // Check if a user with the same EmployeeId already exists
//       const existingUser = await UserModel.findOne({ EmployeeId });


//       if (existingUser) {
//         // Handle duplicate EmployeeId
//         return res.status(400).json({ error: 'EmployeeId is already in use' });
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(Password, salt);

//       const result = new UserModel({
//         EmployeeId: EmployeeId,
//         Name: Name,
//         Designation: Designation,
//         Salary: Salary,
//         Emailaddress: Emailaddress,
//         Password: hashedPassword,
//         // Add the file path to the profilePicture field
//         profilePicture: profilePicture ? profilePicture.path : null,
//       });

//       await result.save();
      
//   //     res.status(201).json(result);
//   // res.json({ message: 'Successfully Registered' });
//   res.status(201).json({ result, message: 'Successfully Registered' });
//     });
//   } 
//   // catch (err) {
//   //   console.error(err);
//   //   res.status(400).json({ err: err.message });
//   // }
//   catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// },
// RegisterDetails: async (req, res) => {
//   try {
//     upload.single('profilePicture')(req, res, async function (err) {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Error uploading file' });
//       }

//       const { EmployeeId, Name, Designation, Salary, Emailaddress, Password } = req.body;
//       const profilePicture = req.file; // Access the file information

//       // Check if a user with the same EmployeeId already exists
//       const existingUser = await UserModel.findOne({ EmployeeId });

//       if (existingUser) {
//         // Handle duplicate EmployeeId
//         return res.status(400).json({ error: 'EmployeeId is already in use' });
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(Password, salt);

//       // Save the profile picture in MongoDB
//       let profilePicturePath = null;
//       if (profilePicture) {
//         profilePicturePath = await storageService.saveFile(profilePicture, 'uploads');
//       }
//       const result = new UserModel({
//         EmployeeId: EmployeeId,
//         Name: Name,
//         Designation: Designation,
//         Salary: Salary,
//         Emailaddress: Emailaddress,
//         Password: hashedPassword,
//         profilePicture: profilePicture ? await storageService.saveFile(profilePicture, 'uploads') : null,
//       });
      
//       // await result.save();
      

//       await result.save();

//       res.status(201).json({ result, message: 'Successfully Registered' });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// },

// RegisterDetails: async (req, res) => {
//   console.log('registerdbody',req.body)
//   try {
//     console.log('registerdbody',req.body)
//    await upload.single('profilePicture')(req, res, async function (err) {
//       if (err) {
//         return res.status(500).json({ error: 'Error uploading file' });
//       }
//       const { EmployeeId, Name, Designation, Salary, Emailaddress, Password } = req.body;
//       const profilePicture = req.file;
//       const existingUser = await UserModel.findOne({ EmployeeId });
//       if (existingUser) {
//         return res.status(400).json({ error: 'EmployeeId is already in use' });
//       }
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(Password, salt);
//       let profilePicturePath = null;
//       if (profilePicture) {
//         profilePicturePath = await storageService.saveFile(profilePicture, 'uploads');
//       }
//       const result = new UserModel({
//         EmployeeId: EmployeeId,
//         Name: Name,
//         Designation: Designation,
//         Salary: Salary,
//         Emailaddress: Emailaddress,
//         Password: hashedPassword,
//         profilePicture: profilePicture ? await storageService.saveFile(profilePicture, 'uploads') : null,
//       });
//       await result.save();
//       res.status(201).json({ result, message: 'Successfully Registered' });
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// },

LoginDetails: async (req, res) => {
  console.log(req.body)
  try {
      const { Emailaddress, Password } = req.body;
      const user = await UserModel.findOne({ Emailaddress });
      if (!user) {
          return res.json({ message: 'Invalid credentials' });
      }
      const comparePassword = await bcrypt.compare(Password, user.Password);
      if (comparePassword) {
          return res.status(200).json({ message: 'Successfully logged in', user: { ...user.toObject(), profilePicture: user.profilePicture } });
      } else {
          return res.json({ message: 'Invalid credentials' });
      }
  } catch (err) {
      res.status(400).json({
          err: err
      });
  }
},   
  LoginDetailsget: async (req, res) => {
            try{
             const result = await UserModel.find();
             res.status(200).json(result);
             return res
            }catch(err){
             res.status(400).json({
                 err:err
              })
            }
  },
forgotPassword : async (req, res) => {
  try {
    const { Emailaddress } = req.body;
    const user = await UserModel.findOne({ Emailaddress });
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    user.resetToken = otp;
    user.resetTokenExpiration = Date.now() + 600000; 
    await user.save();
    return res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
},
resetPassword : async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await UserModel.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.json({ message: 'Invalid or expired reset token' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.Password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    return res.json({ message: 'Password successfully reset' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
},
userDetailsdelete: async (req, res) => {
    try{
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Workorder details deleted successfully"});
    }catch(err){
      res.status(400).json({
          err:err
      })
    }
  },
// userDetailsupdate : async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;
//   const file = req.files ? req.files.profilePicture : null;
//   try {
//     const existingUser = await UserModel.findById(id);
//     if (!existingUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     if (file) {
//       const filePath = await storageService.saveFile(file, 'uploads/');
//       if (existingUser.profilePicture) {
//         try {
//           await fs.unlink(existingUser.profilePicture);
//         } catch (unlinkError) {
//         }
//       }
//       updates.profilePicture = filePath;
//     }
//     const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });
//     const userProject = await userprojectsModel.findOne({ Name: existingUser.Name });
//     if (userProject) {
//       const updateResult = await userprojectsModel.updateMany(
//         { Name: existingUser.Name },
//         {
//           $set: {
//             Name: updatedUser.Name,
//             Designation: updatedUser.Designation,
//           },
//         },
//         { new: true }
//       );
//     }
//     return res.status(200).json({ message: 'User details updated successfully', user: updatedUser.toObject() });
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// },  
userDetailsupdate: async (req, res) => {
  try {
    const { EmployeeId, Name, Designation, Salary, Emailaddress, Password } = req.body;

    // Check if a user with the specified EmployeeId exists
    const existingUser = await UserModel.findOne({ EmployeeId });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If a new password is provided, hash it before updating
    if (Password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);

      existingUser.Password = hashedPassword;
    }

    // Update other fields
    existingUser.Name = Name;
    existingUser.Designation = Designation;
    existingUser.Salary = Salary;
    existingUser.Emailaddress = Emailaddress;

    // Save the updated user
    await existingUser.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
}