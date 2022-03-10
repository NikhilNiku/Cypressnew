/// <reference types="cypress"/>

context('UI',() => {
    const getIframeDocument = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument').should('exist')
    }
    const getIframeBody = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
    }
    describe('One VIN - ACA UI - RENTAL',() => {
        beforeEach(() => {
            cy.logInUI({email: Cypress.env('username'), password: Cypress.env('password')})
            cy.selectACA()
        })
        it('requests a single vin rental',() => {
            cy.get('[name="VIN"]').type('JH4DC4433RS801008').blur()
            cy.get('[role="button"]').click()
            cy.get('[role="listbox"]').should('be.visible')
            cy.wait(500)
            cy.get('[role="option"]').contains('Rental').click()
            cy.wait(500)
            cy.get('[role="button"]').should('contain', 'Rental')
            cy.wait(500)
            cy.get('button').contains('Submit').click()
            cy.wait('@acaRental')
            getIframeBody().find('p').contains('Rental Report').should('be.visible')
            cy.get('button').contains('Close').click()
            cy.get('button').contains('Submit').should('be.visible')

        })
    })
})