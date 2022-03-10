/// <reference types="cypress"/>
context('API', () => {
	describe('One VIN - ACA STRAW REPORT', () => {
		it('returns Straw Report - Happy Path - ACA', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/straw',
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
				.as('getStrawReport');
			cy.get('@getStrawReport').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('level', 'STRAW');
				expect(response.body).to.have.property('vehicles');
                expect(response.body.vehicles[0]).to.have.property('history');
                expect(response.body.vehicles[0]).to.have.property('vehicleInformation');
                expect(response.body.vehicles[0].history).to.have.property('historyRecords');
                expect(response.body.vehicles[0].history).to.have.property('count');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('body');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('country');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('engine');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('manufacturer');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('manufacturerCode');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('model');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('resultCode');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('resultMessage');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('vehicleClass');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('seriesCode');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('vin');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('year');
			});
        });
        
		it('returns Straw Report - Lower Case Letters in VIN', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/straw',
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
				.as('getStrawReport');
			cy.get('@getStrawReport').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('level', 'STRAW');
				expect(response.body).to.have.property('vehicles');
                expect(response.body.vehicles[0]).to.have.property('history');
                expect(response.body.vehicles[0]).to.have.property('vehicleInformation');
                expect(response.body.vehicles[0].history).to.have.property('historyRecords');
                expect(response.body.vehicles[0].history).to.have.property('count');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('body');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('country');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('engine');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('manufacturer');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('manufacturerCode');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('model');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('resultCode');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('resultMessage');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('vehicleClass');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('seriesCode');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('vin');
				expect(response.body.vehicles[0].vehicleInformation).to.have.property('year');
			});
		});
		it('fails to return Straw Report - Invalid Token', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/straw',
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
				.as('getStrawReport');
			cy.get('@getStrawReport').should((response) => {
				expect(response.status).to.eq(401);
			});
		});
		it('fails to return Straw Report - Invalid Request', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/straw',
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
				.as('getRecallReport');
			cy.get('@getRecallReport').should((response) => {
				expect(response.status).to.eq(400);
				expect(response.body.message).to.eq('Invalid request body');
			});
		});
		it('returns Invalid VIN - Check Digit Count', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/straw',
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
				.as('getStrawReport');
			cy.get('@getStrawReport').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.vehicles[0].vehicleInformation).to.have.property(
					'resultMessage',
					'Invalid check-digit: The VIN is greater than 17 characters in length.'
				);
			});
		});
		it('returns Invalid VIN - Year', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/straw',
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
				.as('getStrawReport');
			cy.get('@getStrawReport').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.vehicles[0].vehicleInformation).to.have.property(
					'resultMessage',
					'Invalid check-digit: The VIN contains an invalid year for the make and model.'
				);
			});
		});
		it('returns Invalid VIN - Unknown Pattern', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/straw',
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
				.as('getStrawReport');
			cy.get('@getStrawReport').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.vehicles[0].vehicleInformation).to.have.property(
					'resultMessage',
					'Warning the VIN pattern is unknown.'
				);
			});
		});
	});
	describe('Ten VINs - FULL REPORT', () => {
		it('returns 10 recall reports', () => {
			2;
			cy
				.request({
					method: 'POST',
					url: Cypress.env('acaApi') + 'vehicle/history/straw',
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
				.as('getStrawReport');
			cy.get('@getStrawReport').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('level', 'STRAW');
				expect(response.body).to.have.property('count', 10);
			});
		});
	});
});
