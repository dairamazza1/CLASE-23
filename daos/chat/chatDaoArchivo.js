const { ContenedorArchivo } = require("../../contenedores/ContenedorArchivo");

class ChatDaoArchivo extends ContenedorArchivo{
    constructor() {
        super('./data/chat.txt');
        let products = this.getAll().then(res=>{
            this.id = (res.length > 0) ? res.length + 1 : 1;
        });
    }
    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */

    async save(obj) {
        let products =  await this.getAll();
        obj.id = this.id;
        products.push(obj);
        await this.saveInFile(products);
        this.id++;
        
    }

    /* --------------------------------------- */
    /*                READ ALL                 */
    /* --------------------------------------- */
    async getAll() {
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
    
    
}

module.exports = { ChatDaoArchivo }