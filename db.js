const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URL , {
    dbName :process.env.DB_NAME ,
}).then(() => {
    //console.log('MongoDB URL:', process.env.MONGO_URL);
   console.log('Connected to database');
})
.catch((err) => {
    console.log('Error connecting to database' + err)
})