describe("Flat Invoice Rate - Report Type",()=>{
var workflow = 'ACA standard billing rule 4';
beforeEach(() => {
        cy.loginToAutotecUI({ //login to billing url
                        email: Cypress.env('usernameaca4'),
                        password: Cypress.env('passwordaca4')
                    })
        })
        it("Verify flat rate in the billing information screen",()=>{
            cy.get('div > div > form', {
                timeout: 30000
            }).should('be.visible');
             cy.get('header>div>button',{ timeout: 25000}).click();//click button
             cy.get('nav>:nth-child(2)>div').click();//click on coustmer maintaince
             cy.get('nav>:nth-child(2)>:nth-child(2)>div>div>:nth-child(2)',{ timeout: 25000}).click();//click the coustmer
             cy.get('form>div>:nth-child(2)>div>div').click();//open the drop down
             cy.get('ul>:nth-child(n)').contains('Customer').click();//click on coustmer
             cy.get('form>div>:nth-child(3)>div>div>div>input').clear();
             cy.get('form>div>:nth-child(3)>div>div>div>input').type("Manheim");//search data
             cy.get('table>tbody>tr>td>div',{timeout: 20000}).contains("ACAB0004")
             cy.get("table>tbody>:nth-child(1)>:nth-child(9)>button").click();//find the ACAB0004
             cy.get("div>div>ul>:nth-child(1)").click();
             cy.get('div > div > .menu-option:nth-child(2)', {timeout: 15000}).should('be.visible').scrollIntoView()
             cy.get('div > div > .menu-option:nth-child(2)', {timeout: 15000}).click()//clicking billing information
             cy.get('div > div > div > div > div > form > div > div > div:nth-child(2)').should('contain',workflow)
             cy.get('div > form > div > div > div > div:nth-child(1)').then(($reportsData) => {
                 cy.get($reportsData).should('contain','NMVTIS');
                 cy.get($reportsData).should('contain','$2.6 ea');
             });
        })
    afterEach(()=>{
         cy.logoutAutotecUI();
    })    
       
})