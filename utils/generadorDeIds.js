let faker = require('faker');
faker.locale = 'es';

function generarId() {
    return faker.datatype.number()
}

module.exports = {generarId}