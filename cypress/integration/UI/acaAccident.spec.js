/// <reference types="cypress"/>

context('UI',() => {
    const getIframeDocument = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument').should('exist')
    }
    const getIframeBody = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
    }
    describe('One VIN - ACA UI - ACCIDENT REPORT',() => {
        beforeEach(() => {
            cy.logInUI({email: Cypress.env('username'), password: Cypress.env('password')})
            cy.selectACA()
        })
        it('requests a single vin accident report',() => {
            cy.get('[name="VIN"]').type('JH4DC4433RS801008').blur()
            cy.get('[role="button"]').click()
            cy.get('[role="listbox"]').should('be.visible')
            cy.wait(500)
            cy.get('[role="option"]').contains('Accident').click()
            cy.wait(500)
            cy.get('[role="button"]').should('contain', 'Accident')
            cy.wait(500)
            cy.get('button').contains('Submit').click()
            cy.wait('@acaAccident')
            getIframeBody().find('td').contains('Acura Integra RS').should('be.visible')
            getIframeBody().find('td').contains('MINOR ACCIDENT OR VEHICLE DAMAGE REPORTED: LEFT FRONT CORNER').should('be.visible')
            cy.get('button').contains('Close').click()
            cy.get('button').contains('Submit').should('be.visible')

        })
    })
})