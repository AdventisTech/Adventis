const app = require('./app');
const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log('connected');
}).catch(()=>{
    console.log("failed");
})

// app.listen(process.env.PORT,()=>{
//     console.log(`server is running on ${process.env.PORT}`);
//     console.log(`process.env.MONGODB ${process.env.MONGODB}`)
// })

// app.listen(port, '0.0.0.0', () => {
//     console.log(`Server is running on port ${port}`);
//   });

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});