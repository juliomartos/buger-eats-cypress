import signup from '../pages/SignupPage'
import SignupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Register', () => {

    before(() => {
        cy.log('Everything here is executed once before ALL test cases')
    })

    /*beforeEach(function () {
        cy.log('Everything here is always executed before EACH test case')
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })*/

    after(() => {
        cy.log('Everything here is executed once after ALL test cases')
    })

    afterEach(() => {
        cy.log('Everything here is always executed after EACH test case')
    })

    it('User must become a courier', function () {

        var deliver = SignupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('CPF incorrect document', function () {

        var deliver = SignupFactory.deliver()
        deliver.cpf = '4ba185c68ab'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('email incorrect', function () {

        var deliver = SignupFactory.deliver()

        deliver.mail = 'julio.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalCode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'elecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })

    })

})