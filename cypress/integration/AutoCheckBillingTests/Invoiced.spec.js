
context('UI',() => {
    describe('Invoiced',() => {
        var workflowName = 'test workflow for ACA standard billing rule 1';
        var workflowType = 'ACA';
        var startDate = '09-03-2020'; 
        var endDate='09-04-2020';
        beforeEach(() =>{
            cy.loginToBillingUI({ //login to billing url
                email: Cypress.env('billingUsername'),
                password: Cypress.env('billingPassword')
            })
        }) 
     
        it('Generation of reports',() => {
            cy.billingExceution(workflowName,workflowType, startDate, endDate);
            cy.get('table > thead > tr > :nth-child(4) > span', {timeout: 40000}).should('be.visible')//table visiblity
            cy.get('div > div > span > :nth-child(3) > span > span > input', {timeout: 20000}).uncheck() //unchecking Ready for invoice
            cy.get('table > thead > tr > :nth-child(4) > span', {timeout: 40000}).should('be.visible')//table visiblity
            cy.get('div > div > span > :nth-child(1) > span > span > input', {timeout: 20000}).click()//checking invoiced
            cy.get('table > thead > tr > :nth-child(4) > span', {timeout: 40000}).should('be.visible')//table visiblity
            cy.get('div > table > tbody > :nth-child(1)').contains(workflowName.toUpperCase()).then(workFlow => {
                cy.get('div > table > tbody > :nth-child(1) > td > span > span > input', {
                    timeout: 25000
                }).click() //checking first workflow
            });
            cy.get('div > div > div > div > button').contains('Generate Invoice Summary Report').should('not.be.disabled')
            cy.get('div > div > div > div > button').contains('Get Reports').should('not.be.disabled')
        })

        afterEach(() => {
            cy.logoutBillingUI(); //logout from Billing url
            
        }) 
    })    
})





