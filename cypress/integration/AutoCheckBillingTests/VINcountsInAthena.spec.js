/// <reference types="cypress"/>
import * as AWS from "@aws-sdk/client-glue";

context('API', () => {
    describe('compare VIN transaction counts in redshift and athena', () => {
        var athenaQueryNumber = '3';
        it('C32694 compare VIN transaction counts in redshift and athena', () => {
            cy.request({
                method: 'POST',
                url: 'https://aci.dev.autotec.com/api/vehicle/risk/plus',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'ToHdD6UuoA86qalTiPsXm5vmpftMGNIY8Zw4XAt7',
                    'Accept-Encoding': 'application/gzip',
                    'x-autotec-id': 'ACDV0035'
                },
                body: {
                    "type": "CO",

                    "vehicleRiskRequestAttributes": [{

                        "vin": "5YFBURHEXGP473115",

                        "referenceNumber": "riskplus api",

                        "effectiveEndDate": ""
                    }]
                }
            }).then((res) => {
                cy.log(JSON.stringify(res));
                var vins= [res.body.riskResponse.vehicleRiskResults[0].vin];
                cy.postRiskPlusAPIEndpointCall(athenaQueryNumber,vins);
            })
        });

    });

});