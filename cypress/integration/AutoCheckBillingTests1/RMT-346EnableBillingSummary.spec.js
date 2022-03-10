
context('UI',() => {
    describe('RMT-346 Enable Billing Summary button BEFORE approval status',() => {
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
            cy.billingExceution(workflowName, workflowType, startDate, endDate).then(data=>{  //Calling billing execution function

                //checking selected workflow are in respective states
                cy.get('table > thead > tr > :nth-child(4) > span', {timeout: 40000}).should('be.visible')//table visiblity
                cy.get('div > div > span > :nth-child(1) > span > span > input', {timeout: 20000}).click()//checking invoiced
                cy.get('table > thead > tr > :nth-child(4) > span', {timeout: 40000}).should('be.visible')//table visiblity
                cy.get('div > div > span > :nth-child(3) > span > span > input', {timeout: 20000}).uncheck() //unchecking Ready for invoice
                cy.get('table > thead > tr > :nth-child(4) > span', {timeout: 40000}).should('be.visible')//table visiblity
                cy.get('div > table > tbody > tr >:nth-child(2)', {
                    timeout: 40000
                }).contains(workflowName.toUpperCase()).then(workFlow => {
                    cy.get('div > table > tbody > :nth-child(1) > td > span > span > input', {
                        timeout: 25000
                    }).click() //checking first workflow
                });
            
            })
        })

        afterEach(() => {
            cy.logoutBillingUI();// logout from billing url
            
        })  
    })    
})





