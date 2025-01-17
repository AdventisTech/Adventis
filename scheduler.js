// const cron = require('node-cron');
// const axios = require('axios'); // Import axios for making HTTP requests
// const sendEmail = require('./models/emailService');

// // Function to fetch emails from the API endpoint
// const fetchEmailsFromAPI = async () => {
//   try {
//     const response = await axios.get('https://cstimesheet-unsk.onrender.com/api/user/4391');
//     // Check if the response contains user data
//     if (response.data && Array.isArray(response.data)) {
//       // Filter out users with EmployeeStatus as "Current" and Designation as "User" or "Manager"
//       return response.data
//         .filter(user => user.EmployeeStatus === "Current" && (user.Designation === "User" || user.Designation === "Manager"))
//         .map(user => user.Emailaddress);
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching data from API:", error);
//     return []; // Return an empty array if there's an error
//   }
// };


// // Function to send Friday evening email
// const sendmondayMorningEmail = async () => {
//   try {
//     const formData = {
//       // Your form data here
//     };
//     const recipients = await fetchEmailsFromAPI(formData);
//     if (recipients.length > 0) {
//       const subject = 'Reminder: Please Fill Out Your Timesheet for Last Week!';
//       // const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://proutimesheet.onrender.com';
//       const text = 'Dear Team, This is a friendly reminder to fill out and submit your timesheet for the previous week by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://cstimesheet-unsk.onrender.com';
//       sendEmail(recipients, subject, text);
//     } else {

//     }
//   } catch (error) {

//   }
// };
// // Function to send Friday evening email
// const sendFridayEveningEmail = async () => {
//   try {
//     const formData = {
//       // Your form data here
//     };
//     const recipients = await fetchEmailsFromAPI(formData);
//     if (recipients.length > 0) {
//       const subject = 'Reminder: Please Fill Out Your Timesheet for This Week!';
//       const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://cstimesheet-unsk.onrender.com';
//       sendEmail(recipients, subject, text);
//     } else {

//     }
//   } catch (error) {

//   }
// };
// const sendtestEmail = async () => {
//   try {
//     const formData = {
//       // Your form data here
//     };
//     const recipients = await fetchEmailsFromAPI(formData);
//     if (recipients.length > 0) {
//       const subject = 'Reminder: Please Fill Out Your Timesheet(Test mail)';
//       const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://cstimesheet-unsk.onrender.com';
//       sendEmail(recipients, subject, text);
//     } else {

//     }
//   } catch (error) {

//   }
// };

// // cron.schedule('20 27 17 * * 5', sendmondayMorningEmail);
// cron.schedule('0 10 * * 1', sendmondayMorningEmail);
// cron.schedule('0 17 * * 5', sendFridayEveningEmail);
// // cron.schedule('16 15 * * 3', sendtestEmail);



const cron = require('node-cron');
const axios = require('axios');
const sendEmail = require('./models/emailService');
const festivals = require('./models/wishes');

// Set the timezone globally for Node.js
process.env.TZ = 'Asia/Kolkata';

// Utility function to get today's date in IST (YYYY-MM-DD)
const getTodayDateIST = () => {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
    .toISOString()
    .slice(0, 10);
};

// Function to fetch emails from the API endpoint
const fetchEmailsFromAPI = async () => {
  try {
    const response = await axios.get('https://cstimesheet-unsk.onrender.com/api/user/4391');
    if (response.data && Array.isArray(response.data)) {
      return response.data
        .filter(user => user.EmployeeStatus === "Current" && (user.Designation === "User" || user.Designation === "Manager"))
        .map(user => user.Emailaddress);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return [];
  }
};
const fetchEmailsFromAPI1 = async () => {
  try {
    const response = await axios.get('https://cstimesheet-unsk.onrender.com/api/user/4391');
    if (response.data && Array.isArray(response.data)) {
      return response.data
        .filter(user => user.EmployeeStatus === "Current")
        .map(user => user.Emailaddress);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return [];
  }
};

// Monday Morning Reminder (10:00 AM IST)
cron.schedule('0 10 * * 1', async () => {
  try {
    const recipients = await fetchEmailsFromAPI();
    if (recipients.length > 0) {
      const subject = 'Reminder: Please Fill Out Your Timesheet for Last Week!';
      const text = 'Dear Team, This is a friendly reminder to fill out and submit your timesheet for the previous week by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!';
      sendEmail(recipients, subject, text);
    }
  } catch (error) {
    console.error('Error sending Monday morning email:', error);
  }
});

// Friday Evening Reminder (5:00 PM IST)
cron.schedule('0 17 * * 5', async () => {
  try {
    const recipients = await fetchEmailsFromAPI();
    if (recipients.length > 0) {
      const subject = 'Reminder: Please Fill Out Your Timesheet for This Week!';
      const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!';
      sendEmail(recipients, subject, text);
    }
  } catch (error) {
    console.error('Error sending Friday evening email:', error);
  }
});

// Festival Emails (12:00 AM IST)
cron.schedule('1 8 * * *', async () => {
  try {
    const todayIST = getTodayDateIST();
    const festival = festivals.find(f => f.date === todayIST);

    if (festival) {
      const recipients = await fetchEmailsFromAPI1();
      if (recipients.length > 0) {
        const subject = `Happy ${festival.name}! 🎉`;
        const text = `${festival.name} - May this festive season bring peace, love, and happiness to your home.`;
        const html = `
          <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <h1 style="color: #333;">Happy ${festival.name}!</h1>
              <p style="color: #555; font-size: 16px; margin: 20px 0;">
                Wishing you and your loved ones a joyful ${festival.name}. May this day bring peace, happiness, and prosperity to your home!
              </p>
              <img src="${festival.imageUrl}" alt="${festival.name}" style="width: 100%; max-width: 600px; border-radius: 10px;">
            </div>
          </div>
        `;
        await sendEmail(recipients, subject, text, html);
        console.log("Festival email sent successfully.");
      }
    } else {
      console.log("No festival today.");
    }
  } catch (error) {
    console.error("Error sending festival emails:", error);
  }
});

// Birthday Emails (12:00 AM IST)
cron.schedule('5 11 * * *', async () => {
  try {
    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`; // MM-DD format

    const response = await axios.get('https://cstimesheet-unsk.onrender.com/api/user/4391');
    const employees = response.data;

    if (Array.isArray(employees)) {
      const birthdayEmployees = employees.filter(employee => {
        if (employee.EmployeeStatus === "Current" && employee.DOB) {
          const [year, month, day] = employee.DOB.split('-');
          const dojMonthDay = `${parseInt(month)}-${parseInt(day)}`;
          return dojMonthDay === todayMonthDay;
        }
        return false;
      });

      if (birthdayEmployees.length > 0) {
        for (const employee of birthdayEmployees) {
          const subject = `Happy Birthday ${employee.Name}! 🎉`;
          const text = `Wishing you a fantastic birthday filled with joy, laughter, and all the things you love.`;
          const html = `
            <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
              <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #333;">Happy Birthday ${employee.Name}! 🎉</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">
                  Wishing you a fantastic birthday filled with joy, laughter, and all the things you love.
                </p>
                <img src="cid:birthdayImage" 
                     alt="Birthday Celebration" 
                     style="width: 100%; max-width: 600px; border-radius: 10px; margin-top: 20px;">
              </div>
            </div>
          `;

          // Attach the image inline using Content-ID (CID)
          const attachments = [
            {
              filename: 'birthday.jpg',
              path: 'https://adventisimages.s3.us-east-2.amazonaws.com/mail/birthday+gif.gif', // Use the URL as the path
              cid: 'birthdayImage', // CID to embed the image
            },
          ];

          // Send email with both plain text, HTML, and the inline image
          await sendEmail([employee.Emailaddress], subject, text, html, attachments);
          console.log(`Birthday email sent to ${employee.Name}.`);
        }
      } else {
        console.log("No birthdays today.");
      }
    }
  } catch (error) {
    console.error("Error sending birthday emails:", error);
  }
});



