const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    // set all the url domains that are allowed to access our server
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Let url/domains use specified methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // Allow clients to send specified or auth requests
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // next => so that the request can now continue and be handled by the routes
    next();
})
app.use('/feed', feedRoutes);

mongoose.connect('mongodb+srv://dbUsername:learnAPI@cluster0-ozt5p.mongodb.net/messages?retryWrites=true').then(result => {app.listen(8080);}).catch(err => console.log(err));