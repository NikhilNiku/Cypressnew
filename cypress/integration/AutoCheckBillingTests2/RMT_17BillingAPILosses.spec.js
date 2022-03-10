/// <reference types="cypress"/>

context('UI', () => {
    describe('RMT-17 RMT Billing API "loses" workflow executions', () => {
        let Dates = {
            "billable": [{
                    "startDates": "12-01-2020"
                },
                {
                    "endDates": "12-31-2020"
                }
            ],
            "nonbillable": [{
                    "startDates": "02-01-2021"
                },
                {
                    "endDates": "02-02-2021"
                }
            ]
        }

        beforeEach(() => {
            cy.loginToBillingUI({ //login to billing url
                email: Cypress.env('billingUsername'),
                password: Cypress.env('billingPassword')
            })
        })
        it('checks for loss of workflow', () => {

            cy.get('div > div > div > div > a', {
                timeout: 10000
            }).click()

            //Creation of first workflow
            cy.get('div > form > div > div > div > div > div > svg').click()
                .get('div').contains('Manheim Corporate').click()
            cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(Dates.billable[0].startDates)
            cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(Dates.billable[1].endDates)
            cy.get('button', {
                timeout: 10000
            }).contains('Start Execution').click()
            cy.get('div > div > div > div > button >span').contains('Yes').click()
            cy.get('div > div > button > span', {
                timeout: 10000
            }).contains('Ok').click()

            //Creation of second workflow
            cy.get('div > form > div > div > div > div > div > svg').click()
                .get('div').contains('GALLIPOLIS AUTO AUCTION').click()
            cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(Dates.nonbillable[0].startDates)
            cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(Dates.nonbillable[1].endDates)
            cy.get('button', {
                timeout: 10000
            }).contains('Start Execution').click()
            cy.get('div > div > div > div > button >span').contains('Yes').click()
            cy.get('div > div > button > span', {
                timeout: 10000
            }).contains('Ok').click()

            //Creation on third workflow
            cy.get('div > form > div > div > div > div > div > svg').click()
                .get('div').contains('test workflow for ACA standard billing rule 1').click()
            cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(Dates.billable[0].startDates)
            cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(Dates.billable[1].endDates)
            cy.get('button', {
                timeout: 10000
            }).contains('Start Execution').click()
            cy.get('div > div > div > div > button >span').contains('Yes').click()
            cy.get('div > div > button > span', {
                timeout: 10000
            }).contains('Ok').click()
            cy.get('div > div > a').click() //Back button
            cy.get('div > div > span > :nth-child(2) > span > span > input').click({force:true}); //unchecking Ready for approval
            cy.get('div > div > span > :nth-child(4) > span > span > input').click({force:true}); //checking Running
            cy.wait(240000)

            cy.get('div > div > span > :nth-child(4) > span > span > input').click({force:true}); //unchecking Running
            cy.get('div > div > span > :nth-child(2) > span > span > input').click({force:true}); //checking Ready for approval
            cy.get('table > thead > tr > :nth-child(4) > span', {
                timeout: 15000
            }).should('be.visible')
            cy.get('table > thead > tr > :nth-child(4) > span', {
                timeout: 15000
            }).click() // sorting exrcution time 
            cy.get('div > table > tbody > :nth-child(1) > td > span > span > input', {
                timeout: 15000
            }).click({force:true}); //checking first workflow
            cy.get('div > table > tbody > :nth-child(2) > td > span > span > input').click({force:true}); //checking second workflow
            cy.get('div > table > tbody > :nth-child(3) > td > span > span > input').click({force:true}); //checking third workflow
            cy.get('div > div > div > button > span').contains('Approve').click() //approve button
            cy.get('div > div > button > span').contains('Yes').click()
            cy.wait(5000)
            cy.reload()
            cy.get('div > div > span > :nth-child(2) > span > span > input', {
                timeout: 20000
            }).click({force:true}); //unchecking Ready for approval
            cy.get('div > div > span > :nth-child(3) > span > span > input', {
                timeout: 20000
            }).click({force:true}); //checking Ready for invoice
            //cy.wait(30000)
            cy.get('table > thead > tr > :nth-child(4) > span', {
                timeout: 40000
            }).should('be.visible') //table visiblity
            cy.get('table > thead > tr > :nth-child(4) > span', {
                timeout: 40000
            }).click() // sorting exrcution time
            cy.get('div > table > tbody > :nth-child(1) > td > span > span > input', {
                timeout: 30000
            }).click({force:true}); //checking first workflow
            cy.get('div > table > tbody > :nth-child(2) > td > span > span > input').click({force:true}); //checking second workflow
            cy.get('div > table > tbody > :nth-child(3) > td > span > span > input').click({force:true}); //checking third workflow
            cy.get('div > div > div > button').contains('Generate Invoice').click({force:true}); // Generate Invoice button

            var d = new Date();
            var invoiceNumber = d.getTime();
            cy.get('div > div > form > div > div > div > div').type(invoiceNumber)
            cy.get('div > div > form > :nth-child(2) > button').click() // Generate button  
            cy.get('table > thead > tr > :nth-child(4) > span', {
                timeout: 40000
            }).should('be.visible') //table visiblity
            //cy.get('table > thead > tr > :nth-child(4) > span', {timeout: 40000}).click() // sorting exrcution time
            cy.get('div > table > tbody > :nth-child(1) ', {
                timeout: 30000
            }).should('contain', 'GALLIPOLIS')
            cy.get('div > div > span > :nth-child(3) > span > span > input', {
                timeout: 20000
            }).click({force:true}); //unchecking Ready for invoice
            cy.get('table > thead > tr > :nth-child(4) > span', {
                timeout: 40000
            }).should('be.visible') //table visiblity
            cy.get('div > div > span > :nth-child(1) > span > span > input', {
                timeout: 20000
            }).click() //checking invoiced
            cy.get('table > thead > tr > :nth-child(4) > span', {
                timeout: 40000
            }).should('be.visible') //table visiblity

            cy.getconcatenatedFilename(Dates.billable[0].startDates, Dates.nonbillable[1].endDates, invoiceNumber).then(retrivedDate => {
                cy.readFile('cypress/downloads/' + retrivedDate + '.iif', 'utf-8').then(contents => {
                    expect(contents).to.include('ACA Standard Billing Rule 1');
                    expect(contents).to.include('Manheim');
                })

            })
            cy.get('table > thead > tr > :nth-child(4) > span', {
                timeout: 40000
            }).should('be.visible') //table visiblity
            cy.get('div > div > span > :nth-child(1) > span > span > input', {
                timeout: 30000
            }).click({force:true}); //checking invoiced
            cy.get('div > table > tbody > :nth-child(1) > td > span > span > input', {
                timeout: 30000
            }).click({force:true}); //checking first workflow
            cy.get('div > table > tbody > :nth-child(2) > td > span > span > input').click({force:true}); //checking second workflow


        })
        afterEach(() => {
            cy.logoutBillingUI();

        })
    })




})