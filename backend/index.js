require('dotenv').config()
const express = require('express');
const app = express();
var cors = require('cors')
const router = require('./routes');
const bodyParser = require('body-parser');

var corsOptions = {
    origin: [
        process.env.REACT_APP_URL,
    ]
}
app.use(cors(corsOptions))

const connectToMongoDb = require('./config/config')
connectToMongoDb();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Increase body-parser limit
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

//convert json in the body
app.use(express.json());
app.use('/api/v1', router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});