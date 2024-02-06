
// const nodemailer = require('nodemailer');
// const Form = require('../models/projects1');

// exports.submitForm = async (req, res) => {
//   try {
//     const formData = req.body;

//     // Map properties from formData to match the Mongoose schema
//     const mappedData = {
//       EmployeeId: formData.EmployeeId,
//       Leave: formData.Leave,
//       Name: formData.Name,
//       enddate: formData.enddate,
//       startdate: formData.startdate,
//       reason: formData.reason,
//       to: formData.to || [],
//       cc: formData.cc || [],
//       bcc: formData.bcc || [],
//     };

//     const savedForm = await saveFormToDatabase(mappedData);

//     await sendEmail(mappedData);

//     res.status(201).json({ success: true, data: savedForm });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

// async function saveFormToDatabase(formData) {
//   const savedForm = await Form.create(formData);
//   return savedForm;
// }

// async function sendEmail(formData) {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'leojohn391996@gmail.com',
//       pass: 'uyld vhav luzt qywz',
//     },
//   });

//   const mailOptions = {
//     from: 'leojohn391996@gmail.com', // Use a default 'from' address or customize based on your needs
//     to: formData.to.join(','), // Join multiple 'to' addresses if present
//     cc: formData.cc.join(','), // Join multiple 'cc' addresses if present
//     bcc: formData.bcc.join(','), // Join multiple 'bcc' addresses if present
//     subject: `Leave Request from ${formData.Name}`, // Customize subject based on your needs
//     text: `Name: ${formData.Name}\nEmployeeId: ${formData.EmployeeId}\nLeave: ${formData.Leave}\nStart Date: ${formData.startdate}\nEnd Date: ${formData.enddate}\nReason: ${formData.reason}`,
//   };

//   await transporter.sendMail(mailOptions);
// }



const nodemailer = require('nodemailer');
const Form = require('../models/projects1');

exports.submitForm = async (req, res) => {
  try {
    const formData = req.body;

    // Map properties from formData to match the Mongoose schema
    const mappedData = {
      EmployeeId: formData.EmployeeId,
      Leave: formData.Leave,
      Name: formData.Name,
      enddate: formData.enddate,
      startdate: formData.startdate,
      reason: formData.reason,
      status: formData.status,
      to: formData.to || [],
      cc: Array.isArray(formData.cc) ? formData.cc.flat().filter(Boolean) : [],
      bcc: Array.isArray(formData.bcc) ? formData.bcc.flat().filter(Boolean) : [],
    };

    const savedForm = await saveFormToDatabase(mappedData);

    await sendEmail(mappedData, savedForm); // Pass savedForm as an argument

    res.status(201).json({ success: true, data: savedForm });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

async function saveFormToDatabase(formData) {
  const savedForm = await Form.create(formData);
  return savedForm;
}

async function sendEmail(formData, savedForm) { // Accept savedForm as a parameter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'csoftleave@gmail.com',
      pass: 'xwmy slhx tftk beyc',
    },
  });

  // Ensure that cc and bcc are arrays of strings
  const cc = formData.cc ? formData.cc.flat().filter(Boolean) : [];
  const bcc = formData.bcc ? formData.bcc.flat().filter(Boolean) : [];

  // const approveButton = `<a href="${getApprovalLink(formData, 'Approved', savedForm._id)}"><button style="background-color: green; color: white; padding: 10px; margin: 5px; cursor: pointer;">Approve</button></a>`;
  // const declineButton = `<a href="${getApprovalLink(formData, 'Approved', savedForm._id)}"><button style="background-color: red; color: white; padding: 10px; margin: 5px; cursor: pointer;">Decline</button></a>`;

  // Define approveButton and declineButton before using them in the HTML template
  // const mailOptions = {
  //   from: 'csoftleave@gmail.com',
  //   to: formData.to.join(','),
  //   cc: cc.join(','),
  //   bcc: bcc.join(','),
  //   subject: `Leave Request from ${formData.Name}`,
  //   text: `Name: ${formData.Name}\nEmployeeId: ${formData.EmployeeId}\nLeave: ${formData.Leave}\nStart Date: ${formData.startdate}\nEnd Date: ${formData.enddate}\nReason: ${formData.reason}`,
  //   html: `
  //   <p>Name: ${formData.Name}</p>
  //   <p>EmployeeId: ${formData.EmployeeId}</p>
  //   <p>Leave: ${formData.Leave}</p>
  //   <p>Start Date: ${formData.startdate}</p>
  //   <p>End Date: ${formData.enddate}</p>
  //   <p>Reason: ${formData.reason}</p>
  //   // <p>${approveButton} ${declineButton}</p>
  // `,
  // };

  const mailOptions = {
    from: 'csoftleave@gmail.com',
    to: formData.to.join(','),
    cc: cc.join(','),
    bcc: bcc.join(','),
    subject: `Leave Request from ${formData.Name}`,
    text: `Name: ${formData.Name}\nEmployeeId: ${formData.EmployeeId}\nLeave: ${formData.Leave}\nStart Date: ${formData.startdate}\nEnd Date: ${formData.enddate}\nReason: ${formData.reason}`,
    html: `
    <p>Name: ${formData.Name}</p>
    <p>EmployeeId: ${formData.EmployeeId}</p>
    <p>Leave: ${formData.Leave}</p>
    <p>Start Date: ${formData.startdate}</p>
    <p>End Date: ${formData.enddate}</p>
    <p>Reason: ${formData.reason}</p>

  `,
  };

  await transporter.sendMail(mailOptions);
}

function getApprovalLink(formData, status, formId) {
  // const baseUrl = `https://example.com/${status.toLowerCase()}/${formId}`;
  // const baseUrl = `http://localhost:10000/api/user/approve/${status.toLowerCase()}/${formId}`;
  // const baseUrl = `http://localhost:10000/api/user/approve/${formId}`;
  const baseUrl = `https://cstimesheet2.onrender.com/api/user/approve/${formId}`;
  // 'http://localhost:10000/api/user/Contactsupdate'
  // Add other parameters as needed
  return baseUrl;
}






