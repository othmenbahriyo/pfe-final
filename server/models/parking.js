const mongoose = require('mongoose');
const { fileLoader } = require('ejs');


const Schema = mongoose.Schema;


const parkSchema = new Schema({
    name: String,
    latitude: String,
    longitude: String,
    price: Number,
    nbplace: Number,
    capteur: [{ firstName: String, lastName: String }],
    image: String,
    reservation: [{ type: Schema.Types.ObjectId, ref: 'listRes' }]

});

module.exports = mongoose.model('parking', parkSchema, 'parking');