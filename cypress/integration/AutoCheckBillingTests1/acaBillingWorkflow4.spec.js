import fs from 'fs';
/// <reference types="cypress"/>

context('UI', () => {

    describe('ACA Manheim Billing Workflow 4', () => {
        var login = false;
        var workflowName = 'test workflow for ACA standard billing rule 4';
        var workflowType = 'ACA';
        var startdate = '10-19-2021';
        var enddate = '10-20-2021';
        var numofQuery = '1';
        const filepath = 'GoldenDataTest_FileUploadTest.txt';
        var vins = [Cypress.env('vin')];
        beforeEach(() => {
            cy.loginToAutotecUI({ //Login to autotec dev url 
                email: Cypress.env('usernameaca4'),
                password: Cypress.env('passwordaca4')
            })
        })

        it('Uploading a Test file and verfiying in AWS ', () => {
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