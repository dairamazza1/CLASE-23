const { ContenedorFirebase } = require("../../contenedores/ContenedorFirebase");

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('carrito');
        this.timestamp = Date.now();
    }
    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */
    async save(name, description, code, thumbnail, price, stock) { 
        //const doc = this.collection.doc();     
        let carritoObj = {timestamp: this.timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock, products: []}
        let id = await super.saveInDB(carritoObj).then((id)=>{
            // console.log(id);
            return id;
        }); 
        // 
    }

    /* --------------------------------------- */
    /*                READ ALL                 */
    /* --------------------------------------- */
    async getAll(){
        let result = await super.getContent();
        let docs = result.docs;

        const view = docs.map((doc) => ({
            id: doc.id,
            timestamp: this.timestamp, 
            name: doc.data().name, 
            description: doc.data().description, 
            code: doc.data().code, 
            thumbnail: doc.data().thumbnail, 
            price: doc.data().price, 
            stock: doc.data().stock, 
            products: doc.data().products
        }))
        console.log(view);
        return view;
    }

    /* --------------------------------------- */
    /*                  UPDATE                 */
    /* --------------------------------------- */
    async updateByID(id,product){
        try {
            if(product) {
                console.log(product)
                super.update(id, product)
                return user
            }

        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCarrito(carritoID, product) {
        const addProduct = await super.addObj(carritoID,product);
        return addProduct;
    }
}

module.exports = { CarritoDaoFirebase }