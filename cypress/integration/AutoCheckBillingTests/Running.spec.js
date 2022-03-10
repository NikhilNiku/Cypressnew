///<reference types ="cypress"/>

context('UI', () => {

    describe('First State a billing execution is goes to running state', () => {

        var workflow = 'GALLIPOLIS AUTO AUCTION';
        var startDate = '03-01-2021';
        var endDate = '03-20-2021';

        beforeEach(() => {
            cy.loginToBillingUI({ //login to billing url
                email: Cypress.env('billingUsername'),
                password: Cypress.env('billingPassword')
            })
        })

        it('generate an individual billing execution', () => {
            cy.get('h5').contains('Billing Executions',{timeout: 30000}).should('be.visible');
            cy.get('div.Billing-home>div>div>div>a>svg', {
                timeout: 30000
            }).click() // click on plus sign at upper right corner 
            cy.get('div>form>div>div>div>div>div>svg').click() //  click on workflow dropdown
                .get('div').contains(workflow).click() //   search for require workflow and click
            cy.get('div:nth-child(1)>div.react-datepicker-wrapper>div>input', {
                    timeout: 5000
                }).click()
                .type(startDate) // Entering start Date
            cy.get("div:nth-child(2)>div.react-datepicker-wrapper>div>input").click().type(endDate); //Entering end date
            cy.get('button').contains('Start Execution').as('StartExecution').should('be.visible');//checking start execution visibility
            cy.get('@StartExecution').click(); // click on start execution
            cy.get('div > div > div > div > button >span', {//click on yes
                timeout: 25000
            }).contains('Yes').click({
                force: true
            });
            cy.on('window:alert', (text) => { // Checking wheather a pop up block is appear or not
                expect(text).to.contains('Billing execution successfully initiated!', {
                    timeout: 10000
                });
                cy.get('button').contains('Ok').as('OkButton').should('be.visible')
                cy.get('@OkButton', {
                    timeout: 25000
                }).click({
                    force: true
                })
            });
            cy.get('div > div > a').click(); // click on back button
            cy.get('div > div > span > :nth-child(2) > span > span > input', {
                timeout: 10000
            }).click();//uncheck readyforapproval state

            cy.get("span>label:nth-child(4)>span>span>input", {
                timeout: 5000
            }).check({
                force: true
            }, {
                timeout: 11000
            }); //Check the Running checkBox 

            cy.get("div:nth-child(2)>div.Billing-home>div>table>tbody>tr:nth-child(n)>th", {//checking the selected workflow is present in the running status
                timeout: 11000
            }).each(($el, index, $list) => {
                const rowValue = $el.text()
                if (rowValue.includes(workflow)) {
                    expect(rowValue).to.include(workflow);
                }
            })
        })


        afterEach(() => { //Log out from the Billing URL
            cy.logoutBillingUI();

        })




    })

})