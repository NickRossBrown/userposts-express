const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const feedRoutes = require('./routes/feed');
const multer = require('multer');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const fileFiler = ( req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb( null, true);
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json());
app.use (
    multer({ storage: fileStorage, fileFilter: fileFiler}).single('image')
)
app.use('/images', express.static(path.join(__dirname, 'images')));
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

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message})
})

mongoose.connect('mongodb+srv://dbUsername:learnAPI@cluster0-ozt5p.mongodb.net/messages?retryWrites=true').then(result => {app.listen(8080);}).catch(err => console.log(err));