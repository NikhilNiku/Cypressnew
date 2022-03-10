
context('UI',() => {
    describe('Ready to Invoice',() => {
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
        })

        afterEach(() => {
            cy.logoutBillingUI(); //Logout from Billing url
            
        }) 
    })    
})





