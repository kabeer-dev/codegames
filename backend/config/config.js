require('dotenv').config()
const mongoose = require('mongoose')

const connectToMongoDb = () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL).then(() => {
            console.log('Connected to MongoDB')
        })
    }
    catch (err) {
        console.log('DB Connection Error: ', err)
    }
}
module.exports = connectToMongoDb
