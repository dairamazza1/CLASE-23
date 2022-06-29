/* --------------------------------------- */
/*                FIREBASE                 */
/* --------------------------------------- */
/* --------------------------------------- */
/*     conexión hacia la base de datos     */
/* --------------------------------------- */

let admin = require("firebase-admin");
let serviceAccount = require("../DB/proyecto-66316-firebase-adminsdk-dqc8z-e8a79a1e74.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// import * as model from './config.js';
const db = admin.firestore();
//console.log('Base de datos conectada');

class ContenedorFirebase{
    constructor(collection){
        this.collection = db.collection(collection);
    }
   
    /* --------------------------------------- */
    /*                CREATE                   */
    /* --------------------------------------- */
    async saveInDB(obj){
        try{
            const doc = this.collection.doc(); //id automatico
            obj['id'] = doc;
            // console.log("test: ", obj);
            let productSave = await doc.create(obj);
            // console.log(productSave);
            return doc;
        }
        catch(err){
            console.log(err);
        }
    }
    /* --------------------------------------- */
    /*                READ ALL                 */
    /* --------------------------------------- */
    async getContent(){
        try{
            const querySnapshot = await this.collection.get();
        
            return querySnapshot;  
        }
        catch(err){
            console.log(err);
        }
    }

    /* --------------------------------------- */
    /*                  UPDATE                 */
    /* --------------------------------------- */
    async update(id,set){
        try {
            const doc = this.collection.doc(id);
            const item = await doc.update(set);
            console.log("Usuario actualizado", item);
            return item;
        } catch (error) {
            console.log(error); 
        }
    }
    async addObj(id, obj) {
        const doc = this.collection.doc(id);
        const item = await doc.
        data().products.push(obj);
        //console.log("Producto agregado", item);
        return item;
    }
    /* --------------------------------------- */
    /*                DELETE                   */
    /* --------------------------------------- */
    async deleteById(id){
        try {
            const doc = this.collection.doc(id);
            const item = await doc.delete();
            //console.log("item eliminado", item);           
        } catch (error) {
            console.log(error); 
        }
    }
}

module.exports = {ContenedorFirebase};

