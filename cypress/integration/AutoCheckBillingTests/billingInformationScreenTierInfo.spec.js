describe('Billing information screen needs to display tier information', () => {
    beforeEach(() => {
        cy.loginToAutotecUI({ //Login to autotec dev url 
            email: Cypress.env('usernameaci4'),
            password: Cypress.env('passwordaci4')
        })
    })

    it('Verifing the Available Reports', () => {
        cy.get('div > div > form', {
            timeout: 30000
        }).should('be.visible');
        cy.get('header>div>button', {
            timeout: 5000
        }).click(); //click button
        cy.get('nav>:nth-child(2)>div').click(); //click on coustmer maintenace
        cy.get('nav>:nth-child(2)>:nth-child(2)>div>div>:nth-child(2)', {
            timeout: 25000
        }).click(); //click the coustmer
        cy.get('form>div>:nth-child(2)>div>div').click() //open the drop down
        .get('ul').contains('AutoTec ID').click(); //click on AutoTec ID
        cy.get('form>div>:nth-child(3)>div>div>div>input', {
            timeout: 20000
        }).clear(); //search for ACIB0004 in Serach Data field
        cy.get('form>div>:nth-child(3)>div>div>div>input', {
            timeout: 20000
        }).type("ACIB0004"); //search for ACIB0004 in Serach Data field
        // cy.wait(10000);
        cy.get("div > div > div > div > div> table > tbody > tr > td:nth-child(3)",{timeout:20000}).should('be.visible');//ACIB0004 should be visible
        cy.get("table>tbody>:nth-child(1)>:nth-child(9)>button").click(); //click elipsis to find the ACAB0004
        cy.get("div>div>ul>").contains('Customer Information').click(); //Click on Customer Information
        cy.get('div > div > .menu-option:nth-child(2)', {
            timeout: 15000
        }).should('be.visible').scrollIntoView()
        cy.get('div > div > .menu-option:nth-child(2)', {
            timeout: 15000
        }).click() //clicking billing information     
        cy.get('form>div>:nth-child(2)>:nth-child(2)').should('have.text', 'ACI billing rule 4');
        //Verifying the tier data
        cy.get('div.billing-report-list>:nth-child(n)').then(($el) => {
            const tierElement= [$el]; 
            cy.get(tierElement[0][0]).invoke('text').should('contain', 'Physical Damage Plus Score Report$0.5 ea');
            cy.get(tierElement[0][1]).invoke('text').should('contain', 'Physical Damage Plus Score Report$0.2 ea');
            cy.get(tierElement[0][2]).invoke('text').should('contain', 'Physical Damage Plus Score Report$0.1 ea');
            cy.get(tierElement[0][3]).invoke('text').should('contain', 'Risk Predicator$0.3 ea');
            cy.get(tierElement[0][4]).invoke('text').should('contain', 'Risk Predicator$0.2 ea');
            cy.get(tierElement[0][5]).invoke('text').should('contain', 'Risk Predicator$0.05 ea');
            cy.get(tierElement[0][6]).invoke('text').should('contain', 'Full History$4 ea');
            cy.get(tierElement[0][7]).invoke('text').should('contain', 'Full History$3 ea');
            cy.get(tierElement[0][8]).invoke('text').should('contain', 'Full History$2 ea');
            cy.get(tierElement[0][9]).invoke('text').should('contain', 'Physical Damage Score Report$0.5 ea');
            cy.get(tierElement[0][10]).invoke('text').should('contain', 'Physical Damage Score Report$0.2 ea');
            cy.get(tierElement[0][11]).invoke('text').should('contain', 'Physical Damage Score Report$0.1 ea');
            cy.get(tierElement[0][12]).invoke('text').should('contain', 'Risk Plus$0.5 ea');
            cy.get(tierElement[0][13]).invoke('text').should('contain', 'Risk Plus$0.2 ea');
            cy.get(tierElement[0][14]).invoke('text').should('contain', 'Risk Plus$0.1 ea');
            cy.get(tierElement[0][15]).invoke('text').should('contain', 'All Coverage Score Report$0.5 ea');
            cy.get(tierElement[0][16]).invoke('text').should('contain', 'All Coverage Score Report$0.2 ea');
            cy.get(tierElement[0][17]).invoke('text').should('contain', 'All Coverage Score Report$0.1 ea');
            cy.get(tierElement[0][18]).invoke('text').should('contain', 'All Coverage Plus Score Report$0.5 ea');
            cy.get(tierElement[0][19]).invoke('text').should('contain', 'All Coverage Plus Score Report$0.2 ea');
            cy.get(tierElement[0][20]).invoke('text').should('contain', 'All Coverage Plus Score Report$0.1 ea');
        });
    })

    afterEach(() => {
        cy.logoutAutotecUI();
    })

})