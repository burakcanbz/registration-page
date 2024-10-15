const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const { registerRouter } = require('./src/routes/register');

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}))

app.use('/register', registerRouter)

const PORT = 3000 || process.env.PORT;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions).then(
    () => app.listen(PORT, () => {
            console.log(`server running on ${PORT}`)
        })
);

