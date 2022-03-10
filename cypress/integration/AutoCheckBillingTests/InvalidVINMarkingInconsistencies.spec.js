context('UI', () => {
    describe('Correct Invalid VIN Marking Inconsistencies', () => {
        var workflowName = 'test workflow for ACI billing rule 3';
        const filepath = 'GoldenDataTest_FileUploadTestInvalidVIN.txt';
        var numofQuery = '2';
        var vins= ['1B3HB78K48D73953','XG1WT55N189205419','1C3LC46K6ZN194816','1FTFE24N8MHB408221','1G1JCZZ43Y7184489','3HGGK5H84LM700784'];
        beforeEach(() => {
            cy.loginToAutotecUI({ //Login to autotec dev url 
                email: Cypress.env('usernameaci3'),
                password: Cypress.env('passwordaci3')
            })
        })

        it('Uploading a Test file and verfiying in AWS ', ()=> {
            cy.uploadTestdataVins(workflowName,numofQuery,filepath,vins);
        })




    })


})