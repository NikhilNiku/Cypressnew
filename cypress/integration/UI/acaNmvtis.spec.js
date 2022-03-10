/// <reference types="cypress"/>

context('UI',() => {
    const getIframeDocument = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument').should('exist')
    }
    const getIframeBody = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
    }
    describe('One VIN - ACA UI - NMVTIS',() => {
        beforeEach(() => {
            cy.logInUI({email: Cypress.env('username'), password: Cypress.env('password')})
            cy.selectACA()
        })
        it('requests a single vin nmvtis',() => {
            cy.get('[name="VIN"]').type('1G1JC124627237595').blur()
            cy.get('[role="button"]').click()
            cy.get('[role="listbox"]').should('be.visible')
            cy.wait(500)
            cy.get('[role="option"]').contains('NMVTIS').click()
            cy.wait(500)
            cy.get('[role="button"]').should('contain', 'NMVTIS')
            cy.wait(500)
            cy.get('button').contains('Submit').click()
            cy.wait('@acaNmvtis')
            getIframeBody().find('h4').contains('NMVTIS Title History Reports').should('be.visible')
            cy.get('button').contains('Close').click()
            cy.get('button').contains('Submit').should('be.visible')

        })
    })
})