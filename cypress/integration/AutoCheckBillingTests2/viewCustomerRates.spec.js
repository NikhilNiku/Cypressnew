context('UI',() => {
     
    describe('View Customer Rates',() => {
        beforeEach(() => {
            cy.loginToAutotecUI({ //Login to autotec dev url 
                email: Cypress.env('billingUsername'),
                password: Cypress.env('billingPassword')
            })
        })
     
        it(' Verfiy User is on the Billing Information screen for the customer',() => {
            cy.get('div > div > form', {
                timeout: 30000
            }).should('be.visible');
            cy.get('form > div > div > div > div > div > div > div > div > .Select-arrow-zone', {timeout: 20000}).click()
              .get('div').contains('AutoCheck Auctions').click(); //selecting the respective workflow
            cy.get('form > div > button').contains('Submit').click()
            cy.get('header > div > button > span > svg').click();//clicking hanburger menu
            cy.get('nav > div > div', {timeout: 20000}).contains('Customer Maintenance').click()
              .get('div').contains('Customers').should('be.visible').click();//selecting customer in customer maintenance  
            cy.get('form > div > div:nth-child(2) > div > div > div' , {timeout: 25000}).should('be.visible').click()//selecting the filter
            cy.get('div > ul > li:nth-child(1)', {timeout: 20000}).click()
            cy.get('form > div > div:nth-child(3) > div > div > div > input', {timeout: 10000}).type('standard')//searching for standard 
            cy.get('table > tbody > tr:nth-child(1) > td > button:nth-child(1)>span>svg', {timeout: 20000}).scrollIntoView()
            cy.get('table > tbody > tr:nth-child(1) > td > button:nth-child(1)>span>svg', {timeout: 20000}).should('be.visible').click()//clicking ellipsis
            cy.get('div > ul > a:nth-child(1)', {timeout: 10000}).click()
            cy.wait(5000);
            cy.get('div > div > span:nth-child(2)').contains('Billing Information').click()//clicking billing information
            cy.get('div > div > div > div > div > form > div > div > div:nth-child(1)').should('contain','Billing Plan');//Verifying user is on the billing information screen

        })
        afterEach(() => {
            cy.logoutAutotecUI();
            
        })

    })
    
})





