let faker = require('faker');
faker.locale = 'es';

function generarProducto(id) {
    return {
        id: id,
        name: faker.name.findName(),
        price: faker.datatype.number(),
        thumbnail: faker.image.avatar()
    }
}

module.exports = {generarProducto}
