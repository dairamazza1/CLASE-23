const socket = io.connect();

const { schema, normalize, denormalize } = require('normalizr') 
const util = require('util')
const { print } = require('../utils/normalizrChat') 


function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

function renderCompression(data) {
  const html = `<h1>El porcentaje de compresion:</h1> <br> <h1> % ${data} </h1>`;
  document.getElementById("compression").innerHTML = html;
}

function renderChat(data) {
    let fecha=  new Date();

    let dia = fecha.getDate();
    let anio = fecha.getFullYear();
    let mes = (fecha.getMonth() + 1);

    let hora = fecha.getHours() + ":";
    let minutos = fecha.getMinutes() + ":";
    let segundos = fecha.getSeconds() ;
    const msg = data.map((elem, index) => {
      return `<div>
                    <strong class="blue_chat">${elem.user}</strong> [<strong class="brown_chat">${dia}/${mes}/${anio } ${hora}${minutos}${segundos}</strong>]:
                    <em class="green_chat">${elem.message}</em>
              </div>`;
    }).join(" ");
    document.getElementById("text_set").innerHTML = msg;
    // console.log(msg);
}

function addChat(e) {
     const obj = {
        author: {
          email: document.getElementById("email").value,
          nombre: document.getElementById("name").value,
          apellido: document.getElementById("lastname").value,
          edad: document.getElementById("age").value,
          alias: document.getElementById("alias").value,
          avatar: document.getElementById("thumbnail").value
        },
        text: { text: document.getElementById("text").value }
    };

     console.log("_________");
     console.log(obj);
     socket.emit('new-text', obj);

    document.getElementById("email").value = '';
    document.getElementById("name").value = '';
    document.getElementById("lastname").value = '';
    document.getElementById("age").value = '';
    document.getElementById("alias").value = '';
    document.getElementById("thumbnail").value = '';
    document.getElementById("text").value = '';

    return false;
}
// "data" viene normalizada desde src\routes\productsRoutes.js. Se debe retornar el obeto desnormalizado.
socket.on('text', data => {
    try {
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

        console.log('----------- OBJETO DESNORMALIZADO --------------');
        const denormalizeData = normalizr.denormalize(data.result, dataObj, data.entities);
        print(denormalizeData)
        renderChat(denormalizeData);
      } catch (error) {
        console.log(error);
      }
})

// "data" viene desde src\routes\productsRoutes.js. Viene el valor del %
socket.on("compression", data => {
    renderCompression(data);
})