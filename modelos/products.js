/* --------------------------------------- */
/*                MONGO DB                 */
/* --------------------------------------- */

const mongoose = require('mongoose')

const productsCollection = 'products';

const prodSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true}
})

const products = mongoose.model(productsCollection, prodSchema);
module.exports = products;
