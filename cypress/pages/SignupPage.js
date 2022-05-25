class SignupPage {
    go() {
        //redimensionar o tamanho da janela
        //não precisa usar pois pode ser colocado no cypress.json -- cy.viewport(1440, 900)
        //acessa a página principal alvo que será testada
        cy.visit('/')
        //'get' com sub função 'click' passando um localizador para encontrar um botão
        cy.get('a[href="/deliver"]').click()
        //checkpoint para garantir que se está no lugar certo
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
        //Utilizar o contains, e passando o parametro matchCase como false, o teste passara, pois o case seria ignorado.
        //cy.get('#page-deliver form h1').contains('cadastre-se para fazer entregas', { matchCase: false })
    }

    fillForm(deliveryman) {
        cy.get('input[name="fullName"]').type(deliveryman.name)
        cy.get('input[name="cpf"]').type(deliveryman.cpf)
        cy.get('input[name="email"]').type(deliveryman.mail)
        cy.get('input[name="whatsapp"]').type(deliveryman.phone)

        cy.get('input[name="postalcode"]').type(deliveryman.address.zip)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(deliveryman.address.number)
        cy.get('input[name="address-details"]').type(deliveryman.address.complement)

        cy.get('input[name="address"]').should('have.value', deliveryman.address.street)
        cy.get('input[name="district"]').should('have.value', deliveryman.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliveryman.address.city_uf)

        cy.contains('.delivery-method li', deliveryman.delivery_method).click()
        cy.get('input[accept^="image"]').attachFile('/images/' + deliveryman.cnh)
    }

    submit() {
        cy.get('form button[type^="submit"]').should('have.text', 'Cadastre-se para fazer entregas').click()
        //cy.get('form button[type^="submit"]').contains('cadastre-se para fazer entregas', { matchCase: false }).click()
    }

    modalContentShouldBe(expectedMessage) {
        //cy.get('.swal2-container .swal2-html-container').contains(expectedMessage, {matchCase: false})
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) {
        //cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }

}

export default new SignupPage;