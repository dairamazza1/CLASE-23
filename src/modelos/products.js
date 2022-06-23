/* --------------------------------------- */
/*                MONGO DB                 */
/* --------------------------------------- */

const mongoose = require('mongoose')

const productsCollection = 'products';

const prodSchema = new mongoose.Schema({
    timestamp: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 100},
    code: {type: Number, required: true},
    thumbnail: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
})

const products = mongoose.model(productsCollection, prodSchema);
module.exports = products;
