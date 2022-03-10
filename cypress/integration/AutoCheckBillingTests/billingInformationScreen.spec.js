context('UI', () => {

    describe('Billing Information Screen', () => {
        var workflow = 'ACA standard billing rule 1';

        beforeEach(() => {
            cy.loginToAutotecUI({ //Login to autotec dev url 
                email: Cypress.env('usernameaca1'),
                password: Cypress.env('passwordaca1')
            })
        })

        it('Verifying the rates in Billing information screen ', () => {
            cy.get('div > div > form > div', {
                timeout: 20000
            }).should('be.visible')
            cy.get('header > div > button > span > svg').click(); //clicking hanburger menu
            cy.get('nav > div > div', {
                    timeout: 20000
                }).contains('Customer Maintenance').click()
                .get('div').contains('Customers').should('be.visible').click(); //selecting customer in customer maintenance
            cy.get('form > div > div:nth-child(2) > div > div > div', {
                timeout: 25000
            }).should('be.visible').click() //selecting the filter
            cy.get('div > ul > li:nth-child(4)', {
                timeout: 20000
            }).click()
            cy.get('form > div > div:nth-child(3) > div > div > div > input', {
                timeout: 10000
            }).type(Cypress.env('usernameaca1')); //Searching by emailadress
            cy.get('table > tbody > tr:nth-child(1) > td > button:nth-child(1)>span>svg', {
                timeout: 20000
            }).scrollIntoView()
            cy.get('table > tbody > tr:nth-child(1) > td > button:nth-child(1)>span>svg', {
                timeout: 20000
            }).should('be.visible').click() //clicking ellipsis
            cy.get('div > ul > a:nth-child(1)', {
                timeout: 10000
            }).click()
            cy.get('div > div > .menu-option:nth-child(2)', {
                timeout: 15000
            }).should('be.visible').scrollIntoView()
            cy.get('div > div > .menu-option:nth-child(2)', {
                timeout: 15000
            }).click() //clicking billing information
            //Verifying the data to what is on the billing information screen
            cy.get('div > div > div > div > div > form > div > div > div:nth-child(2)').should('contain', workflow);

            cy.get('div.billing-report-list>:nth-child(n)').then(($el) => {
                const tierElement = [$el];
                cy.get(tierElement[0][0]).invoke('text').should('contain', 'Recall$0.3 ea');
                cy.get(tierElement[0][1]).invoke('text').should('contain', 'Data Exists$0.3 ea');
                cy.get(tierElement[0][2]).invoke('text').should('contain', 'First Last Title$0.7 ea');
                cy.get(tierElement[0][3]).invoke('text').should('contain', 'Rental$0.3 ea');
                cy.get(tierElement[0][4]).invoke('text').should('contain', 'Disaster$0.2 ea');
                cy.get(tierElement[0][5]).invoke('text').should('contain', 'Summary$0.1 ea');
                cy.get(tierElement[0][6]).invoke('text').should('contain', 'Straw Odometer$0.1 ea');
                cy.get(tierElement[0][7]).invoke('text').should('contain', 'HAA$0.1 ea');
                cy.get(tierElement[0][8]).invoke('text').should('contain', 'Accident$2.0 ea');
                cy.get(tierElement[0][9]).invoke('text').should('contain', 'Full Vehicle History ACA$2.0 ea');
                cy.get(tierElement[0][10]).invoke('text').should('contain', 'Compromised$0.3 ea');
                cy.get(tierElement[0][11]).invoke('text').should('contain', 'NMVTIS$0.50 ea');
                cy.get(tierElement[0][12]).invoke('text').should('contain', 'Canadian$0.1 ea');
                cy.get(tierElement[0][13]).invoke('text').should('contain', 'US Vehicle$0.4 ea');
                cy.get(tierElement[0][14]).invoke('text').should('contain', 'Free View$0.2 ea');
                cy.get(tierElement[0][15]).invoke('text').should('contain', 'Exception$0.3 ea');
                cy.get(tierElement[0][16]).invoke('text').should('contain', 'Canadian Plus$0.1 ea');
                cy.get(tierElement[0][17]).invoke('text').should('contain', 'Theft$0.1 ea');
                cy.get(tierElement[0][18]).invoke('text').should('contain', 'Discrepancy$0.2 ea');
            });
        })
        afterEach(() => {
            cy.logoutAutotecUI();

        })
    })

})