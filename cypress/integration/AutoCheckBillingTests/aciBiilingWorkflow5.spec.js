import fs from 'fs';
/// <reference types="cypress"/>

context('UI', () => {

    describe('ACI Biiling Workflow 5 - Support for Tiered Volumn Rate with Monthly Minimum', () => {
        var login = false;
        var workflowName = 'test workflow for ACI billing rule 5';
        var workflowType = 'ACI';
        var startdate = Cypress.env('startDate');
        var enddate = Cypress.env('endDate');
        var numofQuery='1';
        const filepath = 'GoldenDataTest_FileUploadTest.txt';
        var vins= [Cypress.env('vin')];
        beforeEach(() => {
            cy.loginToAutotecUI({ //Login to autotec dev url 
                email: Cypress.env('usernameaci5'),
                password: Cypress.env('passwordaci5')
            })
        })

        it('Uploading a Test file and verfiying in AWS ', () => {
            cy.uploadTestdataVins(workflowName,numofQuery,filepath,vins).then(workflow => { // Calling ACIWorkflow function which is in command.js file
                if (workflow == 'Completed') {
                    cy.loginToBillingUI({ //login to billing url
                        email: Cypress.env('billingUsername'),
                        password: Cypress.env('billingPassword')
                    }).then(data => {
                        login = true; //setting login flag to be true which is used for logging out
                        if (login) {
                            cy.billingExceution(workflowName,workflowType,startdate,enddate); //Calling billingExceution function which is in command.js file
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