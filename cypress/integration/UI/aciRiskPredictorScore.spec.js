/// <reference types="cypress"/>

context('UI',() => {
    const getIframeDocument = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument').should('exist')
    }
    const getIframeBody = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
    }
    describe('One VIN - ACI UI - RISK PREDICTOR SCORE',() => {
        beforeEach(() => {
            cy.logInUI({email: Cypress.env('username'), password: Cypress.env('password')})
            cy.selectACI()
        })
        it('requests a single vin history report',() => {
            cy.get('[name="VIN"]').type('JH4DC4433RS801008').blur()
            cy.get('[role="button"]').click()
            cy.get('[role="listbox"]').should('be.visible')
            cy.wait(500)
            cy.get('[role="option"]').contains('Risk Predictor Score').click()
            cy.wait(500)
            cy.get('[role="button"]').should('contain', 'Risk Predictor Score')
            cy.wait(500)
            cy.get('[role="button"]').last().click()
            cy.get('[role="listbox"]').should('be.visible')
            cy.get('[role="option"]').contains('Default').click()
            cy.get('button').contains('Submit').click()
            cy.wait('@aciRPScore')
            getIframeBody().find('p').contains('VIN: JH4DC4433RS801008').should('be.visible')
            cy.get('button').contains('Close').click()
            cy.get('button').contains('Submit').should('be.visible')

        })
    })
})