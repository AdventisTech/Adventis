
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB)
  .then(() => {
    // console.log('Connected to MongoDB');
  })
  .catch(err => {
    // console.error('Error connecting to MongoDB:', err);
  });

app.listen(process.env.PORT, '0.0.0.0', () => {
  // console.log(`Server is running on port ${process.env.PORT}`);
});
