context('UI', () => {
    describe("RMT-10 Invoices for ACI are missing GL Code, Line Item Code, and Description for Risk Predictor Comparative Rater", () => {
        var workflowName = 'Falcon Insurance';
        var workflowType = 'None';
        var startDate = '03-08-2021';
        var endDate = '03-10-2021';

        beforeEach(() => {
            cy.loginToBillingUI({ //login to billing url
                email: Cypress.env('billingUsername'),
                password: Cypress.env('billingPassword')
            })
        })

        it('Verification of GL Code, Line Item Code and Description for Risk Predictor Comparative Rater', () => {
            cy.billingExceution(workflowName, workflowType, startDate, endDate);
        })

        afterEach(() => {
            cy.logoutBillingUI();
        })
    })
})