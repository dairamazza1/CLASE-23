const { ContenedorMongoDB } = require("../../contenedores/contenedorMongoDB");
const model =  require('../../modelos/carts.js');

class CarritoDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super(model);
        this.timestamp = Date.now();
    }
    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */
    async save(name, description, code, thumbnail, price, stock) { 
        let cart = {timestamp: this.timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock, products: []}
        let cartSaveModel = new model(cart);
        console.log(cartSaveModel);
        let cartSave = await cartSaveModel.save();
    }

    // /* --------------------------------------- */
    // /*                READ ALL                 */
    // /* --------------------------------------- */
    // async getAll(){
    //     let result = await super.getContent();
    //     let docs = result.docs;

    //     const view = docs.map((doc) => ({
    //         id: doc.id,
    //         timestamp: this.timestamp, 
    //         name: doc.data().name, 
    //         description: doc.data().description, 
    //         code: doc.data().code, 
    //         thumbnail: doc.data().thumbnail, 
    //         price: doc.data().price, 
    //         stock: doc.data().stock, 
    //         products: doc.data().products
    //     }))
    //     console.log(view);
    //     return view;
    // }

    /* --------------------------------------- */
    /*                  UPDATE                 */
    /* --------------------------------------- */
    async updateByID(id,cart){
        try {
            if(cart) {
                let prodUpdate = await model.updateOne({ '_id':  id },{ $set: cart });
            }
        } catch (error) {
            console.log(error);
        }
    }
    async addProductToCarrito(carritoID, product) {
        let carrito = await model.updateOne({ '_id':  carritoID },{ $set: {products: product} });
        console.log(carrito);
    }

    /* --------------------------------------- */
    /*                DELETE                   */
    /* --------------------------------------- */
    async deleteById(id){
        try {
            let prodDelete = await model.deleteOne({ '_id':  id });        
        } catch (error) {
            console.log(error); 
        }
    }
}

module.exports = { CarritoDaoMongoDB }