var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {
    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            mail: faker.internet.email(firstName),
            phone: '19974119022',
            address: {
                zip: '13188001',
                street: 'Rua Antônio Francisco Lisboa',
                number: '1720',
                complement: 'House',
                district: 'Jardim Amanda I',
                city_uf: 'Hortolândia/SP'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data

    }

}