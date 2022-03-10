context('UI', () => {

    describe("Manual Billing Execution", () => {
        var workflowName = 'GALLIPOLIS AUTO AUCTION';
        var startDate = '03-01-2021'
        var endDate = '03-20-2021'

        beforeEach(() => {
            cy.loginToBillingUI({ //login to billing url
                email: Cypress.env('billingUsername'),
                password: Cypress.env('billingPassword')
            })

        })

        it('generate an individual billing execution', () => {
            cy.get('div.Billing-home>div>div>div>a>svg', {
                timeout: 40000
            }).click()
            cy.get("div>svg").click().get('div').contains(workflowName).click();
            cy.get(':nth-child(1)>.react-datepicker-wrapper>.react-datepicker__input-container>input').type(startDate);
            cy.get(':nth-child(2)>.react-datepicker-wrapper>.react-datepicker__input-container>input').type(endDate);
            cy.get('button').contains('Start Execution', {
                timeout: 10000
            }).click();
            cy.get('div>button>:nth-child(1)').contains("Yes", {
                timeout: 10000
            }).click();
            cy.on('window:alert', (text) => { //Checking wheather window alert 
                expect(text).to.contains('Billing execution successfully initiated!', {
                    timeout: 10000
                })
                cy.get('button').contains('Ok').as('OkButton').should('be.visible') //click on ok
                cy.get('@OkButton', {
                    timeout: 25000
                }).click({
                    force: true
                })
            })
            cy.get('div > div > a').click();
            cy.get('div > div > span > :nth-child(2) > span > span > input', {
                timeout: 10000
            }).click();//uncheck readyforapproval state
            cy.get('div > div > span > :nth-child(4) > span > span > input', {
                timeout: 10000
            }).click();//check running state
            cy.get('tr>:nth-child(4)>span', {
                timeout: 10000
            }).click();//Sort execution time
            cy.get('tbody>tr>:nth-child(2)').contains(workflowName.toUpperCase(), {
                timeout: 50000
            }).click();//Checking the selected workflow is present in the running status
            cy.get('tbody>tr>:nth-child(1)>span>span>input').click(); // Checking the checkbox of the selected workflow
        })

        afterEach(() => {
            cy.logoutBillingUI();
        })

    })
})