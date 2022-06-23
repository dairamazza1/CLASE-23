const { ContenedorArchivo } = require("../../contenedores/ContenedorArchivo");
const {generarProducto} = require('../../utils/generadorDeProductos')
const {generarId} = require('../../utils/generadorDeIds')

class ProductoDaoArchivo extends ContenedorArchivo{
    constructor() {
        super('./src/data/products.txt');
        let products = this.getAll().then(res=>{
            this.id = (res.length > 0) ? res.length + 1 : 1;
        });
        this.timestamp = Date.now();
    }
    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */
    // async save(name, price, thumbnail) {
    //     let products =  await this.getAll();
    //     let player = {id:this.id, name: name, price: price, thumbnail: thumbnail}
    //     products.push(player);
    //     await this.saveInFile(products);
    //     this.id++;
        
    // }
    async save(obj) {
        let products =  await this.getAll();
        // let player = {id:this.id, name: name, price: price, thumbnail: thumbnail}
        obj.id = this.id;
        products.push(obj);
        await this.saveInFile(products);
        this.id++;
        
    }
    /* --------------------------------------- */
    /*                POPULAR                  */
    /* --------------------------------------- */
    async popular(cant = 5) {
        const nuevosProductos = [];

        for (let index = 0; index < cant; index++) {
            const nuevoProducto = generarProducto(generarId());
            nuevosProductos.push(nuevoProducto);
        }
        //console.log(nuevosProductos);
        this.saveInFile(nuevosProductos);

        return nuevosProductos;
    }
    /* --------------------------------------- */
    /*                READ ALL                 */
    /* --------------------------------------- */
    getAll() {
        const prod = super.getContentFile()
        return prod;
    }
    async getProdById(id) {
        let products = await this.getAll();
        let prod = null;

        if(products.length > 0) {
            let element = await products.find(elem => elem.id == id);
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
            //console.log(jsonObj);
            for (let key in jsonObj) {
                // console.log(key);
                if (jsonObj[key].id == number) {
                    jsonObj[key] = {
                        name: req.name,
                        price: req.price,
                        thumbnail: req.thumbnail
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

module.exports = { ProductoDaoArchivo }