/// <reference types="cypress"/>
context('API', () => {
	describe('One VIN - Risk', () => {
		it('returns Risk - Happy Path - ACI', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('aciApi') + 'vehicle/risk',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0035',
						'x-api-key': Cypress.env('aciApiKey')
					},
					body: {
						"type": "Default",
						"vehicleRiskRequestAttributes": [
						  {
							"effectiveEndDate": "2020-09-21",
							"referenceNumber": "",
							"vin": "1GCEK19M2TE120210"
						  }
						]
					  },
					failOnStatusCode: false
				})
				.as('getRisk');
			cy.get('@getRisk').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('type', 'Default');
				expect(response.body).to.have.property('vehicleRiskResults');
				expect(response.body.vehicleRiskResults[0]).to.have.property('vin');
				expect(response.body.vehicleRiskResults[0]).to.have.property('effectiveEndDate');
				expect(response.body.vehicleRiskResults[0]).to.have.property('referenceNumber');
				expect(response.body.vehicleRiskResults[0]).to.have.property('results');
				
			});
		});
		
		it('returns Risk - Lower Case Letters in VIN', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('aciApi') + 'vehicle/risk',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0035',
						'x-api-key': Cypress.env('aciApiKey')
					},
					body: {
						"type": "Default",
						"vehicleRiskRequestAttributes": [
						  {
							"effectiveEndDate": "2020-09-21",
							"referenceNumber": "",
							"vin": "1gcek19m2te120210"
						  }
						]
					  },
					failOnStatusCode: false
				})
				.as('getRisk');
			cy.get('@getRisk').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('type', 'Default');
				expect(response.body).to.have.property('vehicleRiskResults');
				expect(response.body.vehicleRiskResults[0]).to.have.property('vin');
				expect(response.body.vehicleRiskResults[0]).to.have.property('effectiveEndDate');
				expect(response.body.vehicleRiskResults[0]).to.have.property('referenceNumber');
				expect(response.body.vehicleRiskResults[0]).to.have.property('results');
				
			});
		});
		it('fails to return Risk - Invalid Token', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('aciApi') + 'vehicle/risk',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0035',
						'x-api-key': Cypress.env('aciApiKey') + '1'
					},
					body: {
						"type": "Default",
						"vehicleRiskRequestAttributes": [
						  {
							"effectiveEndDate": "2020-09-21",
							"referenceNumber": "string",
							"vin": "1GCEK19M2TE120210"
						  }
						]
					  },
					failOnStatusCode: false
				})
				.as('getRisk');
			cy.get('@getRisk').should((response) => {
				expect(response.status).to.eq(401);
			});
		});
		it('fails to return Risk - Invalid Request', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('aciApi') + 'vehicle/risk',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0035',
						'x-api-key': Cypress.env('aciApiKey')
					},
					body: {
						vehicleRequestAttributes: [
							{
								vin: '',
								referenceNumber: ''
							}
						]
					},
					failOnStatusCode: false
				})
				.as('getRisk');
			cy.get('@getRisk').should((response) => {
				expect(response.status).to.eq(400);
				expect(response.body.message).to.eq('Invalid request body');
			});
		});
		it('returns Invalid VIN - Check Digit Count', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('aciApi') + 'vehicle/risk',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0035',
						'x-api-key': Cypress.env('aciApiKey')
					},
					body: {
						"type": "Default",
						"vehicleRiskRequestAttributes": [
						  {
							"effectiveEndDate": "2020-09-21",
							"referenceNumber": "",
							"vin": "1GCEK19M2TE1202101"
						  }
						]
					  },
					failOnStatusCode: false
				})
				.as('getRisk');
			cy.get('@getRisk').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.vehicleRiskResults[0]).to.have.property(
					'results',
					'Invalid check-digit: The VIN is greater than 17 characters in length.'
				);
			});
		});
		it('returns Invalid VIN - Year', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('aciApi') + 'vehicle/risk',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0035',
						'x-api-key': Cypress.env('aciApiKey')
					},
					body: {
						"type": "Default",
						"vehicleRiskRequestAttributes": [
						  {
							"effectiveEndDate": "2020-09-21",
							"referenceNumber": "",
							"vin": "3FA6P0K99991ER338"
						  }
						]
					  },
					failOnStatusCode: false
				})
				.as('getRisk');
			cy.get('@getRisk').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.vehicleRiskResults[0]).to.have.property(
					'results',
					'Invalid check-digit: The VIN contains an invalid year for the make and model.'
				);
			});
		});
		it('returns Invalid VIN - Unknown Pattern', () => {
			cy
				.request({
					method: 'POST',
					url: Cypress.env('aciApi') + 'vehicle/risk',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0035',
						'x-api-key': Cypress.env('aciApiKey')
					},
					body: {
						"type": "Default",
						"vehicleRiskRequestAttributes": [
						  {
							"effectiveEndDate": "2020-09-21",
							"referenceNumber": "string",
							"vin": "1FPFW31F83EA70171"
						  }
						]
					  },
					failOnStatusCode: false
				})
				.as('getRisk');
			cy.get('@getRisk').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.vehicleRiskResults[0]).to.have.property(
					'results',
					'Warning the VIN pattern is unknown.'
				);
			});
		});
	});
	describe('Ten VINs - Risk', () => {
		it('returns 10 Risk reports', () => {
			2;
			cy
				.request({
					method: 'POST',
					url: Cypress.env('aciApi') + 'vehicle/risk',
					headers: {
						'Content-Type': 'application.json',
						'Accept-Encoding': 'application.gzip',
						'x-autotec-id': 'ACDV0035',
						'x-api-key': Cypress.env('aciApiKey')
					},
					body: {
						type: "Default",
						vehicleRiskRequestAttributes: [
							{
								vin: '3B7HF13Z11M269883',
								referenceNumber: '',
								effectiveEndDate: '2020-09-21'
							},
							{ vin: '1G3NL12E9YC404176', referenceNumber: '', effectiveEndDate: '2020-09-21' },
							{ vin: '4JGBF71E18A429191', referenceNumber: '', effectiveEndDate: '2020-09-21' },
							{ vin: '1G8ZH528X2Z310309', referenceNumber: '', effectiveEndDate: '2020-09-21' },
							{ vin: 'JNKCA21D2VT502228', referenceNumber: '', effectiveEndDate: '2020-09-21' },
							{ vin: 'JM1BF2325G0V37585', referenceNumber: '', effectiveEndDate: '2020-09-21' },
							{ vin: 'JT2SV12E8G0417278', referenceNumber: '', effectiveEndDate: '2020-09-21' },
							{ vin: 'WVWAA71K08W201030', referenceNumber: '', effectiveEndDate: '2020-09-21' },
							{ vin: '1C6RD6KT4CS332867', referenceNumber: '', effectiveEndDate: '2020-09-21' },
							{ vin: '1N6AA06B74N530577', referenceNumber: '', effectiveEndDate: '2020-09-21' }
						]
					},
					failOnStatusCode: false
				})
				.as('getRisk');
			cy.get('@getRisk').should((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('type', 'Default');
				expect(response.body).to.have.property('vehicleRiskResults').and.lengthOf(10);
			});
		});
	});
});
