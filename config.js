/* --------------------------------------- */
/*                MONGO DB                 */
/* --------------------------------------- */

import mongoose from "mongoose";

const productsCollection = 'products';

const prodSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true},
})



export const products = mongoose.model(productsCollection, prodSchema)