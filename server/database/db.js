require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.MONGO_URL;

const dbConnection = async () => {

    try {

        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            
           
        });

        console.log('Connected to database successfully');


    } catch(err) {

        console.log('Error while connecting to database', err)

    }

}

module.exports = dbConnection;
