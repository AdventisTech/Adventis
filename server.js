// const app = require('./app');
// const mongoose = require('mongoose');
// const env = require('dotenv');
// env.config();

// mongoose.connect(process.env.MONGODB).then(()=>{
//     console.log('connected');
// }).catch(()=>{
//     console.log("failed");
// })

// app.listen(process.env.PORT,()=>{
//     console.log(`server is running on ${process.env.PORT}`);
// })
// const app = require('./app');
// const mongoose = require('mongoose');
// const env = require('dotenv');
// env.config();

// mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

const app = require('./app');
const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
  