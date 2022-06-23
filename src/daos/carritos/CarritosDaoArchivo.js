const { ContenedorArchivo } = require("../../contenedores/ContenedorArchivo");

class CarritoDaoArchivo extends ContenedorArchivo{
    constructor(){
        super("./src/data/carrito.txt");
        let carrito = this.getAll().then(res=>{
            this.id = (res.length > 0) ? res.length + 1 : 1;
        });
        this.timestamp = Date.now();
    }
    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */
    async save(name, description, code, thumbnail, price, stock) {
        let carrito = await this.getContentFile();
        let idCart= this.id;
        let carritoObj = {id: idCart, timestamp: this.timestamp, name: name, description: description, code: code, thumbnail: thumbnail, price: price, stock: stock, products: []}          
        carrito.push(carritoObj);
        await super.saveInFile(carrito);
        this.id++;
        
        return idCart;
    }
    async addProductToCarrito(carritoID, product) {
        let carrito = await this.getAll();
        let card = null;

        if(carrito.length > 0) {
            let element = carrito.find(elem => elem.id == carritoID);
            if(element) {
                element.products.push(product);
                card = element;
            }

            await this.saveInFile(carrito);
        }

        return card;
    }
    /* --------------------------------------- */
    /*                READ ALL                 */
    /* --------------------------------------- */
    async getAll() {
        const prod = await  this.getContentFile()
        return prod;
    }
    async getProdById(id) {
        let products = await this.getAll();
        let prod = null;

        if(products.length > 0) {
            let element = products.find(elem => elem.id == id);
            if(element) {
                prod = element;              
            }
        }
        return prod;
    }

    /* --------------------------------------- */
    /*                  UPDATE                 */
    /* --------------------------------------- */
    async updateByID(number,req){
        try {
            const jsonObj = await this.getAll();
            for (let key in jsonObj) {
                if (jsonObj[key].id === number) {
                    jsonObj[key] = {
                        id: number,
                        timestamp: this.timestamp,
                        name: req.name,
                        description: req.description,
                        code: req.code,
                        thumbnail: req.thumbnail,
                        price: req.price,
                        stock: req.stock
                    }
                }
            }
           // sobreescribir
           await this.saveInFile(jsonObj);
           return await this.getProdById(number);
        } catch (error) {
            console.log(error);
        }
    }
    


}
module.exports = { CarritoDaoArchivo }