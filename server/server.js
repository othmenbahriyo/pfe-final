const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const http = require('http').createServer(express);
const io = require('socket.io')(http);

// Defining the PORT
const port = 3000;

// Initialize the app
const app = express();


// Mongodb Config
const { mongoose } = require('./db.js');



const admin = require('./routes/adminController');
const superviseur = require('./routes/superviseurController');
const paypal = require('./routes/paypal');
const parkController = require('./routes/parkController');
const reservationController = require('./routes/reservationController');
const user = require('./routes/userController');
const superAdmin = require('./routes/superAdmin');
const priceController = require('./routes/priceController');
const sendEmail = require('./routes/sendEmail');
const producerController = require('./routes/kafkaController/producerController');
const consumerController = require('./routes/kafkaController/consumerController');
const chatServer = require('./routes/chatController/chatServer');
var lis = require('./models/listRes');

// Defining the Middlewares
app.use(cors())
    // Set the static folder
app.use(express.static(path.join(__dirname, 'dist')));
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


app.use('/api', admin);
app.use('/api', superviseur);
app.use('/api', superAdmin);
app.use('', paypal);
app.use('/api', parkController);
app.use('/api', reservationController);
app.use('/api', user);
app.use('/api', priceController);
app.use('/api', sendEmail);
app.use('/api', producerController);
app.use('/api', consumerController);
app.use('', chatServer);


app.get("/", function(req, res) {
    res.send(`<h2>hello 3of</h2>`);
})



app.listen(port, function() {
    console.log("Server running on localhost:" + port);

});