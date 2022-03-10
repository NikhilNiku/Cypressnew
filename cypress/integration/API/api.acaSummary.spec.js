/// <reference types="cypress"/>
context('API', () => {
	describe('One VIN - ACA SUMMARY REPORT', () => {
		it('returns Summary Report - Happy Path - ACA', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/summary',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0036',
						'x-api-key': Cypress.env('acaApiKey')
					},
					body: {
						vehicleRequestAttributes: [
							{
								vin: '1GCEK19M2TE120210',
                                referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: ''
							}
						]
					},
					failOnStatusCode: false
				})
				.as('getSummaryReport');
			cy.get('@getSummaryReport').should((response) => {
				expect(response.status).to.eq(200);
			});
        });
        
		it('returns Summary Report - Lower Case Letters in VIN', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/summary',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0036',
						'x-api-key': Cypress.env('acaApiKey')
					},
					body: {
						vehicleRequestAttributes: [
							{
								vin: '3b7hf13z11m269883',
                                referenceNumber: '',
                                dealerNumber: '',
                                saleNumber: ''
							}
						]
					},
					failOnStatusCode: false
				})
				.as('getSummaryReport');
			cy.get('@getSummaryReport').should((response) => {
				expect(response.status).to.eq(200);
			});
		});
		it('fails to return Summary Report - Invalid Token', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/summary',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0036',
						'x-api-key': Cypress.env('acaApiKey') + '1'
					},
					body: {
						vehicleRequestAttributes: [
							{
								vin: '3B7HF13Z11M269883',
                                referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: ''
							}
						]
					},
					failOnStatusCode: false
				})
				.as('getSummaryReport');
			cy.get('@getSummaryReport').should((response) => {
				expect(response.status).to.eq(401);
			});
		});
		it('fails to return Summary Report - Invalid Request', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/summary',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0036',
						'x-api-key': Cypress.env('acaApiKey')
					},
					body: {
						vehicleRequestAttributes: [
							{
								vin: '',
                                referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: ''
							}
						]
					},
					failOnStatusCode: false
				})
				.as('getSummaryReport');
			cy.get('@getSummaryReport').should((response) => {
				expect(response.status).to.eq(400);
				expect(response.body.message).to.eq('Invalid request body');
			});
		});
		it('returns Invalid VIN - Check Digit Count', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/summary',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0036',
						'x-api-key': Cypress.env('acaApiKey')
					},
					body: {
						vehicleRequestAttributes: [
							{
								vin: '3B7HF13Z11M2698831',
                                referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: ''
							}
						]
					},
					failOnStatusCode: false
				})
				.as('getSummaryReport');
			cy.get('@getSummaryReport').should((response) => {
				expect(response.status).to.eq(200);
			});
		});
		it('returns Invalid VIN - Year', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/summary',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0036',
						'x-api-key': Cypress.env('acaApiKey')
					},
					body: {
						vehicleRequestAttributes: [
							{
								vin: '3FA6P0K99991ER338',
                                referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: ''
							}
						]
					},
					failOnStatusCode: false
				})
				.as('getSummaryReport');
			cy.get('@getSummaryReport').should((response) => {
				expect(response.status).to.eq(200);
			});
		});
		it('returns Invalid VIN - Unknown Pattern', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/summary',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0036',
						'x-api-key': Cypress.env('acaApiKey')
					},
					body: {
						vehicleRequestAttributes: [
							{
								vin: '1FPFW31F83EA70171',
                                referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: ''
							}
						]
					},
					failOnStatusCode: false
				})
				.as('getSummaryReport');
			cy.get('@getSummaryReport').should((response) => {
				expect(response.status).to.eq(200);
			});
		});
	});
	describe('Ten VINs - SUMMARY REPORT', () => {
		it('returns 10 summary reports', () => {
			2;
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/summary',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0036',
						'x-api-key': Cypress.env('acaApiKey')
					},
					body: {
						vehicleRequestAttributes: [
							{
								vin: '3B7HF13Z11M269883',
                                referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: ''
							},
							{ vin: '1G3NL12E9YC404176', referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: '' },
							{ vin: '4JGBF71E18A429191', referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: '' },
							{ vin: '1G8ZH528X2Z310309', referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: '' },
							{ vin: 'JNKCA21D2VT502228', referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: '' },
							{ vin: 'JM1BF2325G0V37585', referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: '' },
							{ vin: 'JT2SV12E8G0417278', referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: '' },
							{ vin: 'WVWAA71K08W201030', referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: '' },
							{ vin: '1C6RD6KT4CS332867', referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: '' },
							{ vin: '1N6AA06B74N530577', referenceNumber: '',
                                saleNumber: '',
                                dealerNumber: '' }
						]
					},
					failOnStatusCode: false
				})
				.as('getSummaryReport');
			cy.get('@getSummaryReport').should((response) => {
				expect(response.status).to.eq(200);
			});
		});
	});
});
