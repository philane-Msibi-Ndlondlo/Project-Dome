//IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//MIDDLEWARE
const app = express();

app.use(bodyParser.json());

app.use(cors());

dotenv.config();

//DATEBASE CONNECTION
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true} , (err)=> {
    if (err) return console.log(err);
    console.log('MongoDB up and running also');
})

//ROUTES IMPORTS
const userRoutes = require('./routes/user');
const repoRoutes = require('./routes/repository');

//ROUTES
app.use('/api/projectdome/users', userRoutes);
app.use('/api/projectdome/repository', repoRoutes);

app.listen(3000, ()=> console.log('Server up and running'));