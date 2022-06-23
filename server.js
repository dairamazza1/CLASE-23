//EXPRESS
const express = require('express')
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
const httpServer = require('./src/routes/productsRoutes');

// ENDPOINTS
app.use('/api', httpServer.app);

app.get('*', function (req,res) {
    res.status(404).send({
        status: "error",
        data: "404: Page not found",
        error: -2,
        description: "Ruta "+ req.baseUrl + req.path +" no implementada"
    });
});

////////////////////////////////////////////////

const server = httpServer.httpServer.listen(8080, () => {
    console.log('La aplicacion esta escuchando');
})
