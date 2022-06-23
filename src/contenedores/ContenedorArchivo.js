const fs = require('fs');

class ContenedorArchivo{
    constructor(nombre){
        this.nombre = nombre;
    }
    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */
    async saveInFile(content) {
        fs.writeFileSync(this.nombre, JSON.stringify(content));
    }

    /* --------------------------------------- */
    /*                READ ALL                 */
    /* --------------------------------------- */
    async getByID(number){
        try {
            const arc = fs.readFileSync(this.nombre, 'utf-8');  
            const jsonObj = JSON.parse(arc);
            let foundID = null;
            for (let key in jsonObj) {
                if (jsonObj[key].id === number) {
                    foundID = jsonObj[key];
                    break;
                }
            }
            return foundID;  
        } catch (error) {
            console.log("No se pudieron obtener los productos");
        }
    }
    async  getContentFile(){ 
        let content = [];    
        try {
            const arc =  fs.readFileSync(this.nombre, 'utf-8');         
            content = JSON.parse(arc);
        } catch (error) {
            this.saveInFile(content)
            console.log(`Creacion del archivo ${this.nombre}`);
        }
        return content;
    }
    /* --------------------------------------- */
    /*                DELETE                   */
    /* --------------------------------------- */
    async deleteById(number){
        let flag = false;
        try {          
            const jsonObj = await this.getContentFile();
            for (let key in jsonObj) {
                if (jsonObj[key].id == number) {
                    flag = true;
                    jsonObj.splice(key,1)
                    break;
                }
            }
            console.log(jsonObj);
            if(flag){
                // sobreescribir
                fs.writeFileSync(this.nombre , JSON.stringify(jsonObj))
            }         
        } catch (error) {
            console.log(error);
        }
    }
    async deleteAll(){
         fs.saveInFile(this.nombre , '')
        const arc =  fs.readFile(this.nombre, 'utf-8'); 
        console.log(arc);
    }
}


module.exports = { ContenedorArchivo };