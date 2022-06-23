const socket = io.connect();

function renderProd(data) {
    console.log("*----------------------------------");
    console.log(data);
    // document.getElementById('products').innerHTML = html;
    renderTitle(data);
    //renderPrice(data);
    renderThumbnail(data);
    const price = data.map((elem, index) => {
      return `<div>${elem.price}</div>`;
    }).join(" ");
    document.getElementById("price_set").innerHTML = price;
}

function renderTitle(data) {
    const html = data.map((elem, index) => {
        return(
            `
            <div>${elem.name}</div>
            `
        )
    }).join(" ");
    document.getElementById('title_set').innerHTML = html;
}
function renderPrice(data) {
    const html = data.map((elem, index) => {
        return(
            `
            <div>${elem.price}</div>
            
            `
        )
    }).join(" ");
    document.getElementById('price_set').innerHTML = html;
}
function renderThumbnail(data) {
    const html = data.map((elem, index) => {
        return(
            `
            <div>${elem.thumbnail}</div>
            `
        )
    }).join(" ");
    document.getElementById('thumbnail_set').innerHTML = html;
}


function addProduct(e) {
    const obj = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value 
    }
    //  console.log("_________");
    //  console.log(obj);
    socket.emit('new-products', obj);
    
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';
    return false;
}

socket.on('products', data => {
    renderProd(data);
})