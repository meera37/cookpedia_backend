//import mongoose
const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then((res)=>{
    console.log('Mongodb running successfully');
    
}).catch((error)=>{
    console.log(`mongodb connection failed due to ${error}`);
    
})