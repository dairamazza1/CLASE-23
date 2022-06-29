const { ContenedorMongoDB } = require("../../contenedores/contenedorMongoDB");
const model =  require('../../modelos/products.js');

class ProductoDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super(model);
        this.timestamp = Date.now();
    }

    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */

    async save(name, description, code, thumbnail, price, stock) {
        try {
            let prod = {timestamp: this.timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock}
            let productSaveModel = new model(prod);
            console.log(productSaveModel);
            let productSave = await productSaveModel.save();
        } catch (error) {
            console.log(error);
        } 
        
        
        //console.log(productSave);    
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
    //         stock: doc.data().stock
    //     }))
    //     //console.log(view);
    //     return  view;
    // }

    async getProdById(id){
        try {
            let productID = await model.findById(id).then(ret =>{
                // console.log(ret);
                return ret;
            });
        } catch (error) {
            console.log("No se encontró el ID del producto ingresado");
        }
    }
    

    /* --------------------------------------- */
    /*                  UPDATE                 */
    /* --------------------------------------- */
    async updateByID(id,product){
        try {
            //const objectId =  ObjectId(id)
            if(product) {
                // console.log(product)
                let prodUpdate = await model.updateOne({ '_id':  id },{ $set: product });
            }

        } catch (error) {
            console.log(error);
        }
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

module.exports = { ProductoDaoMongoDB }