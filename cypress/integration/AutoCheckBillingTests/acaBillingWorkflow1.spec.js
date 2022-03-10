context('UI', () => {
    describe('ACA Standard Billing Workflow 1', () => {
        var login = false;
        var workflowName = 'test workflow for ACA standard billing rule 1';
        var startdate = '09-03-2020';
        var enddate = '09-04-2020';
        var workflowType = 'ACA';
        var numofQuery = '1';
        const filepath = 'GoldenDataTest_FileUploadTest.txt';
        var vins = [Cypress.env('vin')];
        beforeEach(() => {
            cy.loginToAutotecUI({ //Login to autotec dev url 
                email: Cypress.env('usernameaca1'),
                password: Cypress.env('passwordaca1')
            })
        })
        it('Uploading a Test file and verfiying in AWS & Verify invoice totals', () => {
            cy.uploadTestdataVins(workflowName, numofQuery, filepath, vins).then(workflow => { // Calling ACIWorkflow function which is in command.js file
                if (workflow == 'Completed') {
                    cy.loginToBillingUI({ //login to billing url
                        email: Cypress.env('billingUsername'),
                        password: Cypress.env('billingPassword')
                    }).then(data => {
                        login = true; //setting login flag to be true which is used for logging out
                        if (login) {
                            cy.billingExceution(workflowName, workflowType, startdate, enddate); //Calling billingExceution function which is in command.js file
                        }
                    })
                }
            })
        })
        afterEach(() => {
            if (login) {
                cy.logoutBillingUI();
            }
        })

    })

})