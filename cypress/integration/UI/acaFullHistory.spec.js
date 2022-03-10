/// <reference types="cypress"/>

context('UI',() => {
    const getIframeDocument = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument').should('exist')
    }
    const getIframeBody = () => {
        return cy.get('iframe[id="experian"]').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
    }
    describe('One VIN - ACA UI - FULL HISTORY REPORT',() => {
        beforeEach(() => {
            cy.logInUI({email: Cypress.env('username'), password: Cypress.env('password')})
            cy.selectACA()
        })
        it('requests a single vin full history report',() => {
            cy.get('[name="VIN"]').type('JH4DC4433RS801008').blur()
            cy.get('[role="button"]').click()
            cy.get('[role="listbox"]').should('be.visible')
            cy.wait(1000)
            cy.get('[role="option"]').contains('Full Vehicle History ACA').click()
            cy.get('[role="button"]').should('contain', 'Full Vehicle History ACA')
            cy.get('button').contains('Submit').click()
            cy.wait('@acaFullHistory')
            getIframeBody().find('span').contains('Acura Integra RS').should('be.visible')
            getIframeBody().find('.score-dial').scrollIntoView().should('exist')
            getIframeBody().find('#stateTitleBrandCollapse-JH4DC4433RS801008').should('exist')
            getIframeBody().find('.text-flagged').contains('Junk or scrapped brand').should('exist')
            getIframeBody().find('.history-flagged').contains('UNREBUILDABLE').should('exist')
            cy.get('button').contains('Close').click()
            cy.get('button').contains('Submit').should('be.visible')

        })
    })
})