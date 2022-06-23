const express = require('express');
const { Router } = express;
const carritoRoutes = Router();

const { CarritoDaoArchivo } = require('../daos/carritos/CarritosDaoArchivo');
const { ProductoDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
let productClass = new ProductoDaoArchivo();
let carritoClass = new CarritoDaoArchivo();

// const { CarritoDaoFirebase } = require('../daos/carritos/CarritosDaoFirebase');
// const { ProductoDaoFirebase } = require('../daos/productos/ProductosDaoFirebase');
// let productClass = new ProductoDaoFirebase();
// let carritoClass = new CarritoDaoFirebase();

// const { CarritoDaoMongoDB } = require('../daos/carritos/CarritosDaoMongoDB');
// const { ProductoDaoMongoDB } = require('../daos/productos/ProductosDaoMongoDB');
// let productClass = new ProductoDaoMongoDB();
// let carritoClass = new CarritoDaoMongoDB();

carritoRoutes.get('/', (req, res) => {
    let products = carritoClass.getAll().then(obj => {
        res.json({Carrito: obj});       
    });
});

// carritoRoutes.get('/:id/productos', (req, res) => {
//     let carritoID = req.params.id;
//     let prodCart = carritoClass.getProductCartByID(carritoID);

//     if(prodCart.length > 0){
//         res.json({Productos: prodCart});
//     }else{
//         res.send("Productos no encontraos");
//     }
// });

carritoRoutes.post('/', (req, res) => {
    let carrito = req.body;
    if (carrito && carrito.name && carrito.description && carrito.code && carrito.thumbnail && carrito.price && carrito.stock) {
        carrito = carritoClass.save(carrito.name, carrito.description, carrito.code, carrito.thumbnail, carrito.price, carrito.stock).then(() =>{
            res.json({result: 'Carrito guardado'});
        });
        
    } else {
        res.send({result: 'Carrito no fue guardado'});
    }
});

carritoRoutes.post('/:id/productos', (req, res) => {
    let carritoID = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id) ;
    try {
        let producto = productClass.getProdById(req.body.id).then(ret =>{
            // console.log('prod: ',ret);
            let carrito = carritoClass.addProductToCarrito(carritoID, ret);
            res.json({result: 'Producto agregado a carrito', carrito: carrito});
        })
    } catch (error) {
        console.log(error);
        res.json({result: 'El producto no pudo ser agregado a carrito'});

    }
});

carritoRoutes.delete('/:id', (req,resp) => {
    let id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id) ;
    try{    
        const prodAux = carritoClass.deleteById(id);
        resp.send('Carrito eliminado con exito')
    }catch(err){
        resp.send('No se encontró el carrito')
    }   
});

// carritoRoutes.delete('/:id/productos/:id_prod', (req,resp) => {
//     const idCart = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id) ;
//     const idProd = isNaN(req.params.id_prod) ? req.params.id_prod : parseInt(req.params.id_prod) ;  
//     try{       
//         const prodAux = carritoClass.deleteProductById(idCart, idProd);
//         resp.send('Producto eliminado con exito')
//     }catch(err){
//         resp.send('No se encontró el producto')
//     }   
// });

module.exports = carritoRoutes;