const cron = require('node-cron');
const axios = require('axios'); // Import axios for making HTTP requests
const sendEmail = require('./models/emailService');

// Function to fetch emails from the API endpoint
const fetchEmailsFromAPI = async () => {
  try {
    const response = await axios.get('https://cstimesheet-unsk.onrender.com/api/user/4391');
    // Check if the response contains user data
    if (response.data && Array.isArray(response.data)) {
      // Filter out users with EmployeeStatus as "Current" and Designation as "User" or "Manager"
      return response.data
        .filter(user => user.EmployeeStatus === "Current" && (user.Designation === "User" || user.Designation === "Manager"))
        .map(user => user.Emailaddress);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return []; // Return an empty array if there's an error
  }
};


// Function to send Friday evening email
const sendmondayMorningEmail = async () => {
  try {
    const formData = {
      // Your form data here
    };
    const recipients = await fetchEmailsFromAPI(formData);
    if (recipients.length > 0) {
      const subject = 'Reminder: Please Fill Out Your Timesheet for Last Week!';
      // const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://proutimesheet.onrender.com';
      const text = 'Dear Team, This is a friendly reminder to fill out and submit your timesheet for the previous week by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://cstimesheet-unsk.onrender.com';
      sendEmail(recipients, subject, text);
    } else {

    }
  } catch (error) {

  }
};
// Function to send Friday evening email
const sendFridayEveningEmail = async () => {
  try {
    const formData = {
      // Your form data here
    };
    const recipients = await fetchEmailsFromAPI(formData);
    if (recipients.length > 0) {
      const subject = 'Reminder: Please Fill Out Your Timesheet for This Week!';
      const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://cstimesheet-unsk.onrender.com';
      sendEmail(recipients, subject, text);
    } else {

    }
  } catch (error) {

  }
};
const sendtestEmail = async () => {
  try {
    const formData = {
      // Your form data here
    };
    const recipients = await fetchEmailsFromAPI(formData);
    if (recipients.length > 0) {
      const subject = 'Reminder: Please Fill Out Your Timesheet(Test mail)';
      const text = 'Dear Team, This is a friendly reminder to fill out and submit your weekly timesheet by the end of the day today. Timely submission helps ensure accurate and timely processing. Thank you for your cooperation!\n\nPlease update your timesheet here: https://cstimesheet-unsk.onrender.com';
      sendEmail(recipients, subject, text);
    } else {

    }
  } catch (error) {

  }
};

// cron.schedule('20 27 17 * * 5', sendmondayMorningEmail);
cron.schedule('0 10 * * 1', sendmondayMorningEmail);
// cron.schedule('0 17 * * 5', sendFridayEveningEmail);
cron.schedule('35 9 * * 6', sendFridayEveningEmail);
// cron.schedule('16 15 * * 3', sendtestEmail);