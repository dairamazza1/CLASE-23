const { ContenedorFirebase } = require("../../contenedores/ContenedorFirebase");

class ProductoDaoFirebase extends ContenedorFirebase {
    constructor(){
        super('productos');
        this.timestamp = Date.now();
    }

    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */

    save(name, description, code, thumbnail, price, stock) { 
        //const doc = this.collection.doc();     
        let prod = {timestamp: this.timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock}
        super.saveInDB(prod);      
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
            stock: doc.data().stock
        }))
        //console.log(view);
        return  view;
    }

    async getProdById(id){
        try {
            let result = await this.collection.get()
            result = result.docs.map(doc => ({ 
                id: doc.id,
                timestamp: doc.data().timestamp,
                name: doc.data().name,
                description: doc.data().description,
                code: doc.data().code,
                thumbnail: doc.data().thumbnail,
                price: doc.data().price,
                stock: doc.data().stock
            }))
            let item = result.find(elem => elem.id == id)
            // console.log(item);
            return item;
        } catch (error) {
            console.log("No se encontró el ID del producto ingresado");
        }
    }
    

    /* --------------------------------------- */
    /*                  UPDATE                 */
    /* --------------------------------------- */
    async updateByID(id,product){
        try {
            if(product) {
                console.log(product)
                super.update(id, product)
                return product
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { ProductoDaoFirebase }