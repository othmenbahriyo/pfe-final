const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priceSchema = new Schema({
    valeur: String,
    date: String,

  
});

module.exports = mongoose.model('price', priceSchema, 'price');