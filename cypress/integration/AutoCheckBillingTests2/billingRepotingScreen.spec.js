context('UI', () => {
    describe('ACI Biiling Workflow 5 - Billing Reporting Screen', () => {

        const moment = require('moment');
        const getLastsixYearAndMonth = () => { //get last six month year and month values
            const today = new Date();
            let lastSixMonths = []
            for (var i = 6; i > 0; i -= 1) {
                const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
                lastSixMonths.push(moment(date).format("MMMM YYYY"))
            }
            return lastSixMonths.reverse()
        }
        const reportValue = ["Billing Summary Report", "Invoice Detail Report", "VIN Count Report"];
        const reportingPeriod = getLastsixYearAndMonth();
        const fileType = ['CSV', 'PDF'];
        const coustmer = ['0 Flat Earth', '1 Flat Earth', '1 Flat Earth12', '12 Test 12', '12 Test 18'];


         beforeEach(() => {
            cy.loginToAutotecUI({ //Login to autotec dev url 
                email: Cypress.env('billingUsername'),
                password: Cypress.env('billingPassword')
            })
        })

        it('Verifing file types available in the Select a File Type drop down list',()=>{
            cy.log('in it block');
            cy.get('h2',{timeout:20000}).contains('Change Product').should('be.visible');
            cy.get('.Select-multi-value-wrapper .Select-placeholder').click();
            cy.get('div.Select').contains("AutoCheck Auctions").click();
            cy.get('span').contains('Submit').click();
            cy.wait(1000);
            cy.get('header>div>button',{ timeout: 5000}).click();//click 3Line button
            cy.get('nav>:nth-child(4)').click();//click reporting
            cy.get('nav>:nth-child(4)>:nth-child(2)>div>div>a').click();//click on the monthly reports
            cy.wait(1000);
            for (var i = 0; i < reportValue.length; i++) {
                cy.getValueFromDropDown("form>:nth-child(1)>div>div>div>div", reportValue[i]);
            } // click every item of Select report
            for (var i = 0; i < reportingPeriod.length; i++) {
                cy.getValueFromDropDown("form>:nth-child(2)>div>div>div>div", reportingPeriod[i]);
            } // click every item of Reporting Period
            for (var i = 0; i < fileType.length; i++) {
                cy.getValueFromDropDown("form>:nth-child(4)>div>div>div>div", fileType[i]);
            } // click every item of select a File Type
            for (var i = 0; i < coustmer.length; i++) {
                cy.getValueFromDropDown("form>:nth-child(3)>div>div>div>div>div>div", coustmer[i]);
            } // click every item of select a coustmer
        })

        afterEach(()=>{       
            cy.logoutAutotecUI(); //logout from autotec url
        })



    })
})