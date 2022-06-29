const mongoose = require('mongoose')

class ContenedorMongoDB{
    constructor(model) {
    /* --------------------------------------- */
    /*     conexión hacia la base de datos     */
    /* --------------------------------------- */
        const URL = 'mongodb+srv://test:test@cluster0.cwmksz4.mongodb.net/?retryWrites=true&w=majority';

        mongoose.connect(URL, {
          useNewUrlParser: true, 
          useUnifiedTopology: true
        }, () => console.log('Connected'));
    
        this.model = model;
    }
    // /* --------------------------------------- */
    // /*                CREATE                   */
    // /* --------------------------------------- */
    // async save(obj){
    //     try{
    //         const add = this.model.in
    //     }
    //     catch(err){
    //         console.log(err);
    //     }



    //     try{
    //         const saveModel = new prodSchema.products(obj);
    //         let productSave = await productSaveModel.save();
    //         console.log(productSave);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }
    /* --------------------------------------- */
    /*                READ ALL                 */
    /* --------------------------------------- */
    async getAll(){
        try{
            return await this.model.find()
        }
        catch(err){
            console.log(err);
        }
    }
    // /* --------------------------------------- */
    // /*                  UPDATE                 */
    // /* --------------------------------------- */
    // async update(filter,set){
    //     try {
    //         let prodUpdate = await this.model.usuarios.updateOne(filter,set);
    //         console.log(prodUpdate);
    //         return prodUpdate;
    //     } catch (error) {
    //         console.log(error); 
    //     }
    // }
    // /* --------------------------------------- */
    // /*                DELETE                   */
    // /* --------------------------------------- */
    // async delete(filter){
    //     try {
    //         let prodDelete = await model.usuarios.deleteOne(filter);            
    //     } catch (error) {
    //         console.log(error); 
    //     }
    // }
    
}


module.exports = { ContenedorMongoDB };

