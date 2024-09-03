const { MONGO_URI } = require('../env/env')
const mongoose = require('mongoose'); // npm install mongoose

const connectToDatabase = () => {
    mongoose.connect(MONGO_URI, {});

    mongoose.connection.on('connected', () => {
        console.log("Connected to MongoDB Successfully");
    })
}

module.exports = {
    connectToDatabase
}