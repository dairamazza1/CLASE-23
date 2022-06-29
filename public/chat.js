//const socket = io.connect();

function renderCompression(data) {
  console.log(data)
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
    const msg = data.mensajes.map((elem, index) => {
      return `<div>
                    <strong class="blue_chat">${elem.author.nombre} ${elem.author.apellido}</strong> [<strong class="brown_chat">${dia}/${mes}/${anio } ${hora}${minutos}${segundos}</strong>]:
                    <em class="green_chat">${elem.text.text}</em>
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

    //  console.log("_________");
    //  console.log(obj);
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
        let author = new normalizr.schema.Entity("author",{}, { 
          idAttribute: "email" 
        });
        //esquema de autores
        let chat = new normalizr.schema.Entity("chat", {
          author: {author}
        });
        //esquema objeto
        let dataObj = new normalizr.schema.Entity("data", {
          mensaje : [chat]
        });
        console.log('------------ OBJETO NORMALIZADO ----------------');
        console.log(data);
        console.log('----------- OBJETO DESNORMALIZADO --------------');
        const denormalizeData = normalizr.denormalize(data.result, dataObj, data.entities);
        //print(denormalizeData)
        console.log(denormalizeData);
        renderChat(denormalizeData);
      } catch (error) {
        console.log(error);
      }
})

// "data" viene desde server.js. Viene el valor del %
socket.on('compression', data => {
    console.log("%%%");
    console.log(data);
    renderCompression(data);
})