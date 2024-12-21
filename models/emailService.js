// // emailService.js
// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// const sendEmail = (recipients, subject, text) => {
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: recipients.join(','),
//     subject: subject,
//     text: text,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// module.exports = sendEmail;



const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = (recipients, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipients.join(','), // Join recipient emails into a single string
    subject: subject,
    text: text, // Plain text content
    html: html, // HTML content with the image
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


module.exports = sendEmail;

