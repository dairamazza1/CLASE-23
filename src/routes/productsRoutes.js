//EXPRESS
const express = require('express');
const app = express();

const { percentage } = require('../utils/percentage') 
const { normalizr } = require('../utils/normalizrChat') 
const { userLogged } = require("../utils/mdwSession");

// VIEWS
app.set('views', './src/views');
app.set('view engine', 'ejs'); //se define extension (motor de plantilla)
app.use(express.static("./src/public")); // Archivos estaticos

//COOKIES - PERSISTENCIA MONGO
const session = require("express-session");
const MongoStore = require('connect-mongo');
// app.use(cookieParser())

app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:127.0.0.1:27017'}),
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: true,
    cookie: {
        // Session expires after 1 min of inactivity.
        expires: 60000,
      }
    })
);

// WEB SOCKETS
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(express.static("../public"));

// DAOS
const { ProductoDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
let product = new ProductoDaoArchivo();

// const { ChatDaoArchivo } = require('../daos/chat/ChatDaoArchivo');
// let chat = new ChatDaoArchivo();

// const { ProductoDaoFirebase } = require('../daos/productos/ProductosDaoFirebase');
// let product = new ProductoDaoFirebase();

// const { ProductoDaoMongoDB } = require('../daos/productos/ProductosDaoMongoDB');
// let product = new ProductoDaoMongoDB();

//Productos WEB SOCKET 
io.on('connection', async(socket) => {
    console.log("connection WEB SOCKET");
    const prod = await product.getAll().then( (obj) =>{
        socket.emit('products', obj);
    })

    socket.on('new-products', async data => {
        console.log(data);
        const saveObj = await product.save(data);
        io.sockets.emit('products', await product.getAll());
    })
})
//chat
io.on('connection', async (socket) => {
    //envío chat normalizado
    const text = await chat.getAll().then( (obj) =>{ 
        const dataContainer = { id: 1, mensajes: [] };
        console.log(obj);
        const chatNormalizr = normalizr(dataContainer) 
        socket.emit('text', chatNormalizr);
    })
    //guardo nuevo obj y envio % compresion
    socket.on('new-text', async data => {
        const saveObj = await chat.save(data);

        const dataContainer = { id: 1, mensajes: [] };
        dataContainer.mensajes = await chat.getAll();

        let dataNocomprimida = JSON.stringify(dataContainer).length;
        let dataNormalized = normalization(dataContainer);
        let dataComprimida = JSON.stringify(dataNormalized).length;

        compression = percentage(dataNocomprimida, dataComprimida);

        socket.emit("compression", compression);

        io.sockets.emit('text', chat.getAll());
    })
})


//**************** TEST PRODUCTOS FAKER ****************
app.post('/productos-test', async (req, res, next) => {
    try {
        res.json(await product.popular(req.query.cant));
    } catch (error) {
        next(error);
    }
})

app.get('/productos-test', async (req, res, next) => {
    try {
        let products = product.getAll().then(obj => {
            res.json({allProducts: obj});       
        });   
    } catch (error) {
        next(error);
    }
})
//*******************************************************

app.get("/login", (req, res) => {
    try {
        if (req.session.username) {
            res.redirect('/');
        }
        res.render('pages/login', {login : true});
        // else {
        //     req.session.destroy((err) => {
        //         if (err) {
        //             //res.send({status: 'Logout Error', body: error})
        //             console.log(err);
        //         } else {
        //             res.render('pages/login', {login : true});
        //         }
                
        //     })
        // }
    } catch (error) {
        console.log(error);
    }
    
  });

app.post('/login', (req, res, next) => {
    let username = req.body.user;
    req.session.user = username;
    res.redirect('pages/log');
    next();
})

app.get("/logout", (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        res.send({ status: "Logout Error", body: error });
      }else {
        let name = req.query.name
        res.render('pages/log', { name , logout : true})
    }
    });
  });


  app.get('/', userLogged, (req, res) => {

    listExists = false;
    listNotExists = false;
    
    const prod = product.getAll().then( (obj) =>{
        obj.length  > 0 ?  res.render('pages/index', {listExists: true, name : req.session.user }) : res.render('pages/index', {listNotExists: true , name : req.session.user}) ;
    }) 
});
app.get("/:id", userLogged, (req, res) => {
    let id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id) ;
    let products = product.getProdById(id).then(obj => {
        res.json(obj);       
    });
});

app.post('/', async (req, res) => {
    let products = req.body;
    console.log(products);
    if (products && products.name && products.thumbnail && products.price ) {
        prod = await product.save( products.name, products.price , products.thumbnail ).then(obj =>{
            res.json({result: 'Producto cargardo', producto: obj});
        });
       
    } else {
        res.json({result: 'No fue posible cargar el producto'});
    }
});

app.put('/:id', userLogged, (req,resp) => {
    let id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id) ;
    try{
        const prodAux = product.updateByID(id,req.body).then( () =>{
            let aux = product.getProdById(id).then( result =>{
                resp.json({result}); 
            })
        })
    }catch(err){
        resp.send('No se puede actualizar el producto')
    }   
}) 
app.delete('/:id', userLogged, (req,resp) => {
    let id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id) ;
    try{    
        const prodAux = product.deleteById(id);
        resp.send('Producto eliminado con exito')
    }catch(err){
        resp.send('No se encontró el producto')
    }   
}) 


module.exports = { app, httpServer };