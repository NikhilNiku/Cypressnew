
context('UI',() => {
    describe('Ready for Approval',() => {
        var workflow = 'GALLIPOLIS AUTO AUCTION';
        beforeEach(() =>{
            cy.loginToBillingUI({ //login to billing url
                email: Cypress.env('billingUsername'),
                password: Cypress.env('billingPassword')
            })
        }) 
     
        it('Generation of reports',() => {
            cy.get('div > div > div > div > a', { timeout: 30000 }).click()
            cy.get('div > form > div > div > div > div > div > svg ').click()
            .get('div').contains(workflow).click()
            cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(Cypress.env('startDate'))
            cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(Cypress.env('endDate'))          
            cy.get('button', { timeout: 5000 }).should('be.visible').contains('Start Execution').click()
            cy.get('div > div > div > div > button >span').contains('Yes').click()
            cy.get('div > div > button > span', { timeout: 5000 }).should('be.visible').contains('Ok').click()//approve execution
            cy.get('div > div > a').click() //back button
            cy.get('div > div > span > :nth-child(2) > span > span > input', { timeout: 15000 }).uncheck() //unchecking Ready for approval
            cy.get('div > div > span > :nth-child(4) > span > span > input').check() //checking Running
            cy.wait(60000)  
            cy.get('div > div > span > :nth-child(4) > span > span > input', { timeout: 15000 }).uncheck() //unchecking Running
            cy.get('div > div > span > :nth-child(2) > span > span > input').check() //checking Ready for approval
            cy.get('div > table > tbody > tr', {timeout: 60000}).should('be.visible')
            cy.get('table > thead > tr > :nth-child(4) > span').click() // sorting exrcution time
            cy.get('div > table > tbody > tr >:nth-child(2)', {
                timeout: 40000
            }).contains(workflow.toUpperCase()).then(workFlow => {
                cy.get('div > table > tbody > :nth-child(1) > td > span > span > input', {
                    timeout: 25000
                }).click() //checking first workflow
            });
        
            //checking active buttons
            cy.get('div > div > div > div > button', {timeout: 10000}).contains('Approve').should('not.be.disabled')
            cy.get('div > div > div > div > button').contains('Generate Invoice Summary Report').should('not.be.disabled')
            cy.get('div > div > div > div > button').contains('Print Billing Reports').should('not.be.disabled')
            cy.get('div > div > div > div > button').contains('Get Reports').should('not.be.disabled')
            cy.get('div > div > div > button > span').contains('Generate Invoice Summary Report').click()//Generate Invoice Summary Report button
            cy.get('div > div > button', {timeout: 10000}).should('be.visible')
            cy.contains('Ok', {timeout: 10000}).click()
            cy.get('div > div > div > button:nth-child(5)').click()//clicking Get reports button
            //Downloading the file Billing files
            cy.get('div > div > div > p :nth-child(6)', {timeout: 15000}).then(($input) => {
                cy.downloadFile($input.attr('href'),'cypress/downloads','ACIBillingRule2-FlatInvoice_BillingSummary.csv')
            });

            cy.get('div > div > div > p :nth-child(8)').then(($input) => {
                cy.downloadFile($input.attr('href'),'cypress/downloads','ACIBillingRule2-FlatInvoice_InvoiceDetailsReport.csv')
            });

            cy.get('div > div > div > p :nth-child(10)').then(($input) => {
                cy.downloadFile($input.attr('href'),'cypress/downloads','ACIBillingRule2-FlatInvoice_VinCountReport.csv')
            });
            cy.reload()
            cy.get('table > thead > tr > :nth-child(4) > span', { timeout: 10000 }).should('be.visible').click() // sorting exrcution time
            cy.get('div > table > tbody > tr >:nth-child(2)', {
                timeout: 40000
            }).contains(workflow.toUpperCase()).then(workFlow => {
                cy.get('div > table > tbody > :nth-child(1) > td > span > span > input', {
                    timeout: 25000
                }).click() //checking first workflow
            });
        
            cy.get('div > div > div > button > span').contains('Approve').click() //approve button
            cy.get('div > div > button', { timeout: 5000 }).should('be.visible').contains('Yes').click() 
            cy.get('div > div > span > :nth-child(2) > span > span > input', { timeout: 15000 }).uncheck() //unchecking Ready for approval
            cy.get('div > div > span > :nth-child(3) > span > span > input', {timeout: 15000}).click() //checking Ready for invoice
            cy.wait(5000);
            cy.get('div > div > span > :nth-child(3) > span > span > input', {timeout: 15000}).uncheck() //unchecking Ready for invoice
            cy.wait(5000);
            cy.get('div > div > span > :nth-child(3) > span > span > input', {timeout: 15000}).check() //checking Ready for invoice
            cy.wait(5000);
            cy.get('div > table > tbody > :nth-child(1) > th').should('contain',workflow);
            //Verfying whether downloaded files are present in  cypress/downloads folder
			cy.verifyDownload('ACIBillingRule2-FlatInvoice_BillingSummary.csv', { timeout: 25000 });
            cy.verifyDownload('ACIBillingRule2-FlatInvoice_InvoiceDetailsReport.csv', { timeout: 25000 });
            cy.verifyDownload('ACIBillingRule2-FlatInvoice_VinCountReport.csv', { timeout: 25000 });
        })

        afterEach(() => {
            cy.logoutBillingUI();
            
        }) 
    })    
})





