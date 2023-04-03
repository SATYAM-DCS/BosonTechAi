const mongoose = require('mongoose');


const dotenv=require('dotenv').config();

//connect mongodb
mongoose.connect(process.env.MONGO_URL||'mongodb://localhost/BosonTechAi');
//got connection
const db = mongoose.connection;
//error
db.on('error',()=>{
    console.log("Error In connet to DB");
})
//successfully connect 
db.once('open',()=>{
    console.log("Successfully Connect With DB");
})

module.exports = db;