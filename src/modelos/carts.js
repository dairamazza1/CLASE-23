/* --------------------------------------- */
/*                MONGO DB                 */
/* --------------------------------------- */

const mongoose = require('mongoose')

const cardsCollection = 'cards';

const cardSchema = new mongoose.Schema({
    timestamp: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 100},
    code: {type: Number, required: true},
    thumbnail: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    products: {type: Array, required: true},
})

const cards = mongoose.model(cardsCollection, cardSchema);
module.exports = cards;
