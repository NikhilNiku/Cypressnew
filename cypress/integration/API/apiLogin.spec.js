context('API', () => {
    describe('Attepmts to login via API', () => {
        it('makes a post request to cognito', () => {
            cy.logInAPI('telerik@autotec.com', 'password')
        })
    })
})