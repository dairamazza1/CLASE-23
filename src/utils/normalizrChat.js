const { schema, normalize, denormalize } = require("normalizr");
const util = require("util");

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

function normalizr(data) {
    // const dataChat = { id: 1, mensajes: [] };
    // dataChat.mensajes = data;
    //esquema de autor del mensaje
    let author = new schema.Entity("author",{}, { 
    idAttribute: "email" 
    });
    //esquema de autores
    let chat = new schema.Entity("chat", {
    author: {author}
    });
    //esquema objeto
    let dataObj = new schema.Entity("data", {
    mensaje : [chat]
    });
    
    // console.log('----------- OBJETO ORIGINAL --------------');
    // const notCompressDataLength = JSON.stringify(dataObj).length;
    // console.log(notCompressDataLength);
    
    console.log('----------- OBJETO NORMALIZADO --------------');
    const normalizeData = normalize(data, dataObj);
    print(normalizeData)
    const compressDataLength = JSON.stringify(normalizeData).length;
    console.log(compressDataLength);
    
    // console.log('----------- OBJETO DESNORMALIZADO --------------');
    // const denormalizeData = denormalize(normalizeData.result, chat, normalizeData.entities);
    // print(denormalizeData)  

    return normalizeData;
}

module.exports = {normalizr, print};

