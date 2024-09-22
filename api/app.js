const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const { registerRouter } = require('./src/routes/register');

const app = express()

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}))

// app.use('/', (req, res) => {
//     console.log('hello')
// })

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

