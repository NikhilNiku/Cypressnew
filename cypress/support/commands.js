// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
import 'cypress-file-upload';
import * as AWS from "@aws-sdk/client-glue";
require('cypress-downloadfile/lib/downloadFileCommand')
require('cy-verify-downloads').addCustomCommand();

const path = require('path');
//set the accessKey , secert key and region
const awsCredentials = {
    accessKeyId: Cypress.env('accessKeyId'),
    secretAccessKey: Cypress.env('secretAccessKey'),
    region: Cypress.env('region'),
};
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

//To get transactiondate and createddate which is used in the queries for getting latest results in athena
const today = new Date();
const getdate = today.getDate();
var day = getdate < 10 ? ("0" + getdate) : getdate;
const getMonth = today.getMonth() + 1;
var month = getMonth < 10 ? ("0" + getMonth) : getMonth;
const year = today.getFullYear();
var transactiondate =  "%"+year.toString()+'-'+month.toString()+"%-" + day.toString()+"%";
var createddate = transactiondate;


var queries = [
    "SELECT * FROM transactions where vin='" + Cypress.env('vinRiskPlus') + "' and createddate like '" + createddate + "'",
    "SELECT count(vin) FROM transactions where vin='" + Cypress.env('vinRiskPlus') + "' and createddate like '" + createddate + "'",
    "SELECT count(vin) FROM transactions where autotecid='ACDV0035' and createddate like '" + createddate + "'",
    "SELECT * FROM transactions where vin='" + Cypress.env('vin') + "' and transactiondate like '" + transactiondate + "'",
    "SELECT vin, isinvalidvin FROM transactions where createddate like '" + createddate + "' and autotecid='ACIB0003' group by vin, isinvalidvin"
];


Cypress.Commands.add('logInAPI', ({
    email,
    password
}) => {
    cy.intercept('https://cognito-idp.us-east-1.amazonaws.com/').as('cognito')
    cy.request('POST', 'https://cognito-idp.us-east-1.amazonaws.com/', {
        "AuthFlow": "USER_SRP_AUTH",
        "ClientId": "35rdtogdhf81evimpp5bvgpjod",
        "AuthParameters": {
            "USERNAME": email,
            "SRP_A": "27e75024b1f939d7b2e201eeb53c3b6fa80110b98e3a7704571ef500c9a9cf5a77ce292a11ea6f99acbd9ed4909d253b3a7135b3237e8b581eacb91e55530728c82bd6bf41b4ed007e2c449bc397e7d48358cb5558e88fe09dac7aebe38e8563ac2db21b4f57f7a42f44a06f2dcd74b99084ac333a44e33289eae82601c7e95f1a76056337a15a1b34c865293c41a5821b97da5c3fcdfc07ca484f3daf4e9afe7c03b54f39b16b70bab7d558aee93cf04c0bb332c68558fa2f36e9d7732567c54adec9c2e82de46a733b171f4f9d1d6924c0dfc5d7caac7cd670e8188da834a0f5e787106858a7acfe90c1226b048d13ec73ae3f261b30a7049945b680067e442d2f7bd9d0c5dfb3eb75650aacbcccd05ee788c751509e039f92abbd0837a0840984be33fe69ce003981636b528e0dfa55a6c66b9a3ab943259263dc3b8d529ca8493107e37ce4e9edd091b6e0ef8f17f54e7021081e69ecd8dae6cbf37055ccbe057e138f776282c6c974e4ad803b47694d1fad420285b7fa5ef162247311ed"
        },
        "ClientMetadata": {}
    })
})

Cypress.Commands.add('logInUI', ({
    email,
    password
}) => {
    cy.intercept('/latest/search-service').as('network')
    cy.intercept('/latest/users/locations').as('locations')
    cy.intercept('/latest/reports//full-history?VIN=JH4DC4433RS801008&referenceId=&product=ACA&report=VEHICLE_HISTORY').as('acaFullHistory')
    cy.intercept('/latest/reports//full-history?VIN=JH4DC4433RS801008&referenceId=&product=ACI&report=VEHICLE_HISTORY').as('aciFullHistory')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=ACCIDENT').as('acaAccident')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=CANADIAN').as('acaCanadian')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=CANADIAN_PLUS').as('acaCanadianPlus')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=COMPROMISED').as('acaCompromised')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=DISASTER').as('acaDisaster')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=DISCREPANCY').as('acaDiscrepancy')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=EXCEPTION').as('acaException')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=HAA').as('acaHaa')
    cy.intercept('/latest/nmvtis-report?VIN=1G1JC124627237595&referenceId=&product=ACI').as('aciNmvtis')
    cy.intercept('/latest/nmvtis-report?VIN=1G1JC124627237595&referenceId=&product=ACA').as('acaNmvtis')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=RECALL').as('acaRecall')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=RENTAL').as('acaRental')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=THEFT').as('acaTheft')
    cy.intercept('/latest/aca-reports?VIN=JH4DC4433RS801008&reportType=US_VEHICLE').as('acaUSVehicle')
    cy.intercept('/latest/reports/full-history?VIN=JH4DC4433RS801008&referenceId=&product=ACI&report=RISK_PLUS').as('aciRPS')
    cy.intercept('/latest/reports/risk-predictor-score?model=Default&VIN=JH4DC4433RS801008&referenceId=&endDate=**').as('aciRPScore')
    cy.visit('/')
    cy.get('button').contains('Sign In').as('signInButton').should('be.visible')
    cy.get('[name="username"]').type(email).blur()
    cy.get('[name="password"]').type(password).blur()
    cy.get('@signInButton').click()
    cy.wait(10000)
    cy.get('.Select').click()
    cy.wait('@locations')
    cy.get('.jss308').contains('AutoTec Test').click()
    cy.get('button').contains("Submit").click()
    cy.wait('@network')
    cy.get('[type="submit"]').contains('Submit').as('submit').should('be.visible')
    cy.get('[role="radiogroup"]').children().should('have.length', 3)
})

Cypress.Commands.add('selectACA', () => {
    cy.get('[type="radio"]').check('AutoCheck Auctions')
    cy.get('button').contains('Submit').click()
    cy.get('img').invoke('attr', 'src').should('eq', '/static/media/ACA.8e878e3f.png')
})

Cypress.Commands.add('selectACI', () => {
    cy.get('[type="radio"]').check('AutoCheck Insurance')
    cy.get('button').contains('Submit').click()
    cy.get('img').invoke('attr', 'src').should('eq', '/static/media/logo.5d52459f.png')
})

Cypress.Commands.add('loginToAutotecUI', ({
    email,
    password
}) => {
    cy.visit('/', {
        timeout: 10000
    });
    cy.get('button').contains('Sign In').as('signInButton').should('be.visible');
    cy.get('[name="username"]').type(email).blur();
    cy.get('[name="password"]').type(password).blur();
    cy.get('@signInButton').click();
    cy.wait(30000);
})

Cypress.Commands.add('selectLocation', () => {
    cy.get("label", {
        timeout: 20000
    }).contains("Locations");
    cy.contains('Select Location')
    cy.get('div.Select-multi-value-wrapper').click()
        .get('div').contains("ACI Billing Rule 6 - Tiered Min").click()
    cy.get('span').contains('Submit').click()
    cy.wait(10000)
})

Cypress.Commands.add('selectLocationForCustomer', () => {
    cy.get("label", {
        timeout: 20000
    }).contains("Locations");
    cy.contains('Select Location')
    cy.get('div.Select-multi-value-wrapper').click()
        .get('div').contains("ACI Billing Rule 1 - Flat Rate").click()
    cy.get('span').contains('Submit').click()
    cy.wait(10000)
})

Cypress.Commands.add('logoutBillingUI', () => {
    cy.log('Logging out from Billing UI');
    cy.get('button').contains('Sign Out').click({
        force: true
    });
})

Cypress.Commands.add('logoutAutotecUI', () => {
    cy.log('Logging out from Autotec UI');
    cy.get('header > div > button > span > svg', {
        timeout: 25000
    }).click();
    cy.get('h3', {
        timeout: 25000
    }).contains('Logout').click();
})

Cypress.Commands.add('selectScores', () => {
    cy.get('div > div > div > ul > li:nth-child(2) > div > div > div', {
            timeout: 25000
        }).scrollIntoView().click()
        .get('li').contains('AZ').click();
    cy.get('div > div > div > ul > li:nth-child(3) > div > div > div').scrollIntoView().click()
        .get('li').contains('CA').click();
})

Cypress.Commands.add('uploadTestdataVins', (workflowName, numofQuery, filepath, vins) => {
    cy.get('header > div > button > span > svg',{timeout: 30000}).click();
    cy.get('h3').contains('Submit VIN').click();
    cy.get('h3').contains('File', {
        timeout: 25000
    }).click();
    cy.get('input[type="file"]', {
        timeout: 30000
    }).attachFile(filepath);
    if (workflowName.includes('ACI')) {
        if (!workflowName.includes('6')) {
            cy.get('ul > li:nth-child(7) > div > div > div > div', {
                    timeout: 25000
                }).scrollIntoView().click()
                .get('li').contains('AZ').click();
            cy.get('ul > li:nth-child(8) > div > div > div > div').scrollIntoView().click()
                .get('li').contains('CA').click();
        } else {
            cy.selectScores();
        }
    }
    cy.get('span').contains('Submit', {
        timeout: 25000
    }).click();
    cy.gettranscationpath().then(transpath => {
        cy.get('body > div > div > div > button', {
            timeout: 50000
        }).click();
        cy.logoutAutotecUI();
        return cy.wait(480000).then({
            timeout: 3600000
        }, data => {
            return new Promise((resolve, reject) => {
                processAWSOperations(transpath.fullPath, transpath.utcDate, numofQuery, vins).then(awsOutput => {
                    cy.log('awsOutput ' + awsOutput);
                    resolve(awsOutput);
                });
            })
        });
    });
})

async function processAWSOperations(transpath, utcDate, numofQuery, vins) {
    cy.log('Inside processAWSOperation function')
    try {
        var searchFilecount = 0; // used for seraching file in next folder if file is not present in current folder
        await verifyUploadedFileinS3(transpath, utcDate, searchFilecount, vins);
        var glue_state = await runCrawler();
        cy.log('glue_state: ' + glue_state);
        if (glue_state == 'Crawled') {
            if (numofQuery == '3') {
                for (var q = 0; q < queries.length - 2; q++) {
                    await executeQueryInAthena(queries[q], vins)
                }
            } else if (vins.length > 1) {
                await executeQueryInAthena(queries[queries.length - 1], vins);
            } else {
                await executeQueryInAthena(queries[queries.length - 2], vins);
            }
        }
        return 'Completed';
    } catch (error) {
        cy.log(error);
    }
}

//Establishing the connection to s3 and verify the file has been uploaded
function verifyUploadedFileinS3(transpath, utcDate, searchFilecount, vins) {
    return new Promise(async (resolve, reject) => {
        cy.log("Inside verify Uploaded File in S3 function");
        const moment = require('moment');
        var s3FileNames = []; //get the list of keys(files) from a bucket
        var AWS = require("aws-sdk"); // Load the AWS SDK for Node.js
        var transcationPath = transpath;
        var transactions = 'transactions/';
        var transFolderPath = transactions.concat(transcationPath);
        cy.log('transFolderPath: ' + transFolderPath);

        try {
            AWS.config.setPromisesDependency();
            AWS.config.update(awsCredentials);
            const s3 = new AWS.S3(); //Create S3 service object

            const response = await s3.listObjectsV2({ //Call S3 to obtain a list of the objects in the bucket
                Bucket: Cypress.env('bucketName'),
                Prefix: transFolderPath
            }).promise();

            if (response.Contents.length != 0) {
                response.Contents.forEach((content) => {
                    if (content.Key.endsWith('.gz')) {
                        s3FileNames.push(content.Key);
                    }
                });
            } else {
                var error_msg = "The required folder=> " + transFolderPath + " is not present in S3, Hence Uploaded file is not present in S3";
                throw error_msg;
            }

            var datetimevalue = [];
            var count = 0;
            for (var i = 0; i < s3FileNames.length; i++) {
                var dateInFileName = s3FileNames[i].substring(62, 81);
                var formmattedDateInFilename = moment(dateInFileName, 'YYYY-MM-DD-HH-mm-ss').format("MMMM DD, YYYY HH:mm:ss");
                var formattedDateVal = new Date(formmattedDateInFilename);
                datetimevalue.push(formattedDateVal);
                if (formattedDateVal.getTime() >= utcDate.getTime()) {
                    cy.log("Uploaded file is present in S3")
                    count++;
                    await uploadedFileVINVerificationInS3(s3FileNames[s3FileNames.length - 1], s3, vins);
                } else {
                    if (searchFilecount == 1) {
                        throw new Error("Uploaded file is not present in S3");
                    }
                }
            }
            if (count > 0) {
                resolve()
            } else {
                if (searchFilecount == 0) { //search file in next folder if file is not present in existing folder
                    searchFilecount = searchFilecount + 1;
                    var formattedhour = parseInt(transpath.split('/').slice(-1));;
                    var tranpathnew = transpath.substring(0, 10) + '/' + ((++formattedhour) < 10 ? ("0" + (formattedhour)) : (formattedhour));
                    verifyUploadedFileinS3(tranpathnew, utcDate, searchFilecount, vins)
                };
            }
        } catch (e) {
            cy.log('our error', e);
            reject('File Uploading  in S3 has been rejected/failed ');
        }
    })
}

//Running the crawler to check the transcations present in Athena 
function runCrawler() {
    //setting the access key , seceret key and region
    var Crawler_count = 0;
    return new Promise((resolve, reject) => {
        cy.log('Inside runCrawler function');
        const client = new AWS.Glue({
            region: Cypress.env('region'),
            credentials: {
                accessKeyId: Cypress.env('accessKeyId'),
                secretAccessKey: Cypress.env('secretAccessKey')
            }
        });

        const wait_until_ready = async (Crawler_count) => {
            var state_previous = 'None';
            var Crawler_state;
            do {
                try {
                    let crawler_data = await getCrawlerStatus(client) //To get the crwaler status 
                    Crawler_state = crawler_data ?.Crawlers[0] ?.State;
                    if (Crawler_state !== state_previous) {
                        state_previous = Crawler_state
                    }
                    if (Crawler_state == 'READY') {
                        Crawler_count = Crawler_count + 1;
                        return Crawler_count;
                    }
                    await sleep(5000);
                } catch (error) {
                    cy.log(error);
                    reject('Rejected crawler error ')
                }
            } while (Crawler_state !== 'READY');

        }
        wait_until_ready(Crawler_count).then(ready_count => {
            startCrawler(client).then(data => {
                wait_until_ready(ready_count).then(crawled_count => {
                    if (crawled_count == 2) {
                        resolve('Crawled');
                    }
                });
            });
        });
    })
}

//Exceuting query to get the transcations in Athena
function executeQueryInAthena(queryString, vins) {

    return new Promise((resolve, reject) => {
        cy.log('Inside Athena function');
        const AthenaExpress = require("athena-express");
        const aws = require("aws-sdk"); // Load the AWS SDK for Node.js
        aws.config.update(awsCredentials); //Setting the credentials

        //configuring athena-express with aws sdk object
        const athenaExpressConfig = {
            aws,
            /* required */
            getStats: true,
            formatJson: true,
            retry: 200,
            s3: Cypress.env('S3Uri')
        };
        //Initializing athena-express
        const athenaExpress = new AthenaExpress(athenaExpressConfig);

        //Invoking a query on Amazon Athena
        (async () => {
            let query = {
                sql: queryString,
                /* required */
                db: "billing",
                pagination: 20
            };

            try {
                cy.log(query);
                let results = await athenaExpress.query(query);
                if (results['Items']['length'] > 0 && vins.length == 1) {
                    cy.log("Transcations are present");
                    resolve('Present');
                } else if (vins.length > 1) {
                    for (var i = 0; i < results['Items'].length; i++) {
                        if ((results['Items'][i].vin) == vins[0] || (results['Items'][i].vin) == vins[1] || (results['Items'][i].vin) == vins[2] || (results['Items'][i].vin) == vins[3] || (results['Items'][i].vin) == vins[4]) {
                            if ((results['Items'][i].isinvalidvin) == true) {
                                cy.log('Flag is true for all Valid Vins');
                                resolve('Present');
                            } else {
                                throw new Error('flag is not true for all Valid Vins')
                            }
                        } else if ((results['Items'][i].vin) = vins[5]) {
                            if ((results['Items'][i].isinvalidvin) == false) {
                                cy.log('flag  is false for all Invalid vins')
                            } else {
                                throw new Error("flag is not false for all Invalid vins")
                            }
                        }
                    }
                } else {
                    throw new Error("No results returend when populated the query");
                }

            } catch (error) {
                cy.log(error);
                reject('Rejected In executeQueryInAthena function');
            }
        })();
    })
}

//To get the present crawler status
function getCrawlerStatus(client) {
    var crawlerParams = {
        CrawlerNames: [Cypress.env('CrawlerName'), ]
    };

    return new Promise((resolve, reject) => {
        client.batchGetCrawlers(crawlerParams, function (err, data) { //get crawlers list
            if (err) {
                cy.log(err, err.stack);
                reject(err);
            } // an error occurred
            else {
                resolve(data);
            }
        });
    })
}

//starts  the crawler to run at non-scheduled time while testing
function startCrawler(client) {
    return new Promise((resolve, reject) => {
        cy.log('Starting the crawler');

        var params = {
            Name: Cypress.env('CrawlerName'),
        };

        const data = client.startCrawler(params, function (err1, crawlerOutput) { //starting the crawler
            if (err1) {
                cy.log(err1, err1.stack);
                reject(err1);
            } else {
                resolve(crawlerOutput);
            }
        });
    })
}

Cypress.Commands.add('loginToBillingUI', ({
    email,
    password
}) => {
    cy.visit('https://billing.dev.autotec.com/');
    cy.url().should('eq', 'https://billing.dev.autotec.com/');
    cy.get('button').contains('LOGIN').as('LOGINButton').should('be.visible'); //checking login button is enabled
    cy.get('input[id="username"]').type(email).blur(); //entering email
    cy.get('input[id="password"]').type(password).blur(); //enetring password
    cy.get('@LOGINButton').click(); //Click on login button
})

Cypress.Commands.add('billingExceution', (workflowName, workflow, startdate, enddate) => {
    cy.log('Inside billingExceution function');
    cy.contains('Billing Executions', {timeout: 30000}).should('exist');
    cy.get('div.Billing-home > div > div > div > a > svg', {
        timeout: 30000
    }).click();
    cy.get('div > form > div > div > div > div > div > svg', {
            timeout: 25000
        }).click()
        .get('div').contains(workflowName).click(); //selecting the respective workflow
    cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(startdate); //selecting the start date
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(enddate); //selecting the end date
    cy.get('button').contains('Start Execution', {
        timeout: 25000
    }).click(); //Start execution button
    cy.get('div > div > div > div > button >span', {
        timeout: 25000
    }).contains('Yes').click();
    cy.get('div > div > button > span', {
        timeout: 25000
    }).contains('Ok').click();
    cy.get('div > div > a').click();
    cy.get('div > div > span > :nth-child(2) > span > span > input', {
        timeout: 25000
    }).click(); //unchecking Ready for approval
    cy.get('div > div > span > :nth-child(4) > span > span > input', {
        timeout: 25000
    }).click(); //checking Running
    if (workflowName == 'test workflow for ACA standard billing rule 1') {
        cy.wait(240000);
    } else {
        cy.wait(60000);
    }
    cy.get('div > div > span > :nth-child(4) > span > span > input', {
        timeout: 25000
    }).click(); //unchecking Running
    cy.get('div > div > span > :nth-child(2) > span > span > input', {
        timeout: 25000
    }).click(); //checking Ready for approval
    cy.get('table > thead > tr > :nth-child(4) > span', {
        timeout: 25000
    }).click(); // sorting execution time
    cy.get('div > table > tbody > tr >:nth-child(2)', {
        timeout: 40000
    }).contains(workflowName.toUpperCase()).then(workFlow => {
        cy.get('div > table > tbody > :nth-child(1) > td > span > span > input', {
            timeout: 25000
        }).click() //checking first workflow
    });

    //checking active buttons
    cy.get('div > div > div > div > button', {
        timeout: 10000
    }).contains('Approve').should('not.be.disabled')
    cy.get('div > div > div > div > button').contains('Generate Invoice Summary Report').should('not.be.disabled')
    cy.get('div > div > div > div > button').contains('Print Billing Reports').should('not.be.disabled')
    cy.get('div > div > div > div > button').contains('Get Reports').should('not.be.disabled');

    cy.get('div > div > div > button > span').contains('Approve', {
        timeout: 25000
    }).click() //approve button
    cy.get('div > div > button').contains('Yes').click();
    cy.wait(5000);
    cy.reload();
    cy.wait(10000);
    cy.get('table > thead > tr > :nth-child(4) > span', {
        timeout: 25000
    }).click();
    cy.get('div > div > span > :nth-child(2) > span > span > input', {
        timeout: 25000
    }).click() //unchecking Ready for approval
    cy.get('div > div > span > :nth-child(3) > span > span > input', {
        timeout: 25000
    }).click() //checking Ready for invoice
    cy.wait(20000);
    cy.get('div > table > tbody > :nth-child(1)').contains(workflowName.toUpperCase()).then(workFlow => {
        cy.get('div > table > tbody > :nth-child(1) > td > span > span > input', {
            timeout: 25000
        }).click() //checking first workflow
    });

    //checking active buttons
    cy.get('div > div > div > div > button', {
        timeout: 10000
    }).contains('Generate Invoice').should('not.be.disabled')
    cy.get('div > div > div > div > button').contains('Generate Invoice Summary Report').should('not.be.disabled')
    cy.get('div > div > div > div > button').contains('Get Reports').should('not.be.disabled')

    cy.get('div:nth-child(2) > div.Billing-home > div > div:nth-child(3) > div > div:nth-child(2)').contains('Generate Invoice', {
        timeout: 25000
    }).click() // Generate Invoice button
    var d = new Date();
    var invoiceNumber = d.getTime();
    cy.get('div > div > form > div > div > div > div').type(invoiceNumber)
    cy.get('div > div > form > :nth-child(2) > button', {
        timeout: 50000
    }).click() // Generate button
    cy.wait(40000).then(data => {
        readFileFromIIF(invoiceNumber, workflowName, workflow, startdate, enddate);
    })
})

//Reads the iif and csv  files from Cypress/Download folder after downloading 
function readFileFromIIF(invoiceNumber, workflowName, workflow, startdate, enddate) {

    try {
        cy.log('Inside read File From IIF');

        cy.getconcatenatedFilename(startdate, enddate, invoiceNumber).then(concatenatedFilename => {
            var csvconcatenatedFilename = concatenatedFilename + '.csv';
            var iifconcatenatedFilename = concatenatedFilename + '.iif';

            var projectRootPath = path.dirname(require.main.filename)
            const downloadFilepath = projectRootPath + Cypress.env('downloadedPath');
            cy.task('files', downloadFilepath).then(res => { //listing the downloaded files which is in the cypress\download folder
                for (var j = 0; j <= res.length - 1; j++) {
                    if ((res[j] == iifconcatenatedFilename)) { 
                        cy.log('IIF file is present');
                        if (workflowName.includes('Falcon')) {
                            cy.readFile('cypress/downloads/' + concatenatedFilename + '.iif', 'utf-8').then(Output => { // Reading the .iif file
                                const lines = Output.split('\n');
                                const lineLength = lines.length; // number of rows
                                for (let j = 0; j < lineLength - 1; j++) {
                                    var riskCheckVar = 'Risk Predictor Comparative Rater';
                                    if (lines[j].toLowerCase().indexOf(riskCheckVar.toLowerCase()) != -1) {
                                        const amountColumn = lines[j].split('\t');
                                        expect(amountColumn[4]).to.equal('40055')
                                        expect(amountColumn[13]).to.equal('6003')
                                    }
                                }
                            })
                        }
                        var invoiceTotal = 0;
                        if (workflowName.includes('ACA') || (workflowName.includes('ACI'))) {
                            cy.readFile('cypress/downloads/' + concatenatedFilename + '.iif', 'utf-8').then(iifOutput => { // Reading the .iif file
                                cy.log('Reading the .iif file ')
                                const lines = iifOutput.split('\n');
                                const lineLength = lines.length;
                                for (let j = 0; j < lineLength - 1; j++) {
                                    var Transvalcheck = 'SPL';
                                    if (lines[j].indexOf(Transvalcheck) == 0) {
                                        const amountColumn = lines[j].split('\t');
                                        if (workflowName.includes('ACA')) {
                                            var memo = ['Theft', 'Discrepancy', 'Exception', 'Accident', 'Canadian', 'NMVTIS', 'AutoCheck Auctions Flat Fee – Manheim']
                                        } else {
                                            var memo = ['Risk Plus Score', 'Risk Predictor Score', 'Full Vehicle History ACI', 'Risk Predictor Comparative Rater']
                                        }
                                        var memolength = memo.length;
                                        var invoicecount = 0;
                                        while (invoicecount <= memolength - 1) {
                                            if (amountColumn[9] == memo[invoicecount]) {
                                                let sum = amountColumn[7].toString();
                                                invoiceTotal = parseFloat(invoiceTotal) + parseFloat(sum);
                                            }
                                            invoicecount++;
                                        }
                                    }
                                }
                                expect(-parseInt(invoiceTotal)).to.equal(Cypress.env('invoiceTotal' + workflow + 'Workflow' + workflowName.charAt(workflowName.length - 1)))
                                cy.log('InvoiceTotal is : ' + parseInt(-invoiceTotal));
                            })
                        }
                    }
                }
            });
        })
    } catch (error) {
        cy.error(error);
    }
}

//To verify the VINS present in the uploaded file in s3
function uploadedFileVINVerificationInS3(gzfilename, s3, vins) {
    return new Promise((resolve, reject) => {
        try {
            const params = {
                Bucket: 'autotec-dev-aca-aci-transactions',
                Key: gzfilename,
            };
            s3.getObject(params, function (err, data) {
                if (err) {
                    cy.log(err, err.stack); // an error occurred
                } else {
                    var s3DownloadedFileData = data.Body.toString();
                    if (vins.length == 1) {
                        if (s3DownloadedFileData.includes('"vin":' + '"' + vins[0] + '"')) {
                            cy.log('Transactions are present in s3');
                            resolve('VINPresent')
                        }
                    } else if (vins.length > 1) {
                        const s3DownloadedFileDataLines = s3DownloadedFileData.split('\n')
                        const s3DownloadedFileDataLineLength = s3DownloadedFileDataLines.length;
                        if (s3DownloadedFileDataLineLength == 0) {
                            throw new Error("Empty file")
                        }

                        for (var i = 0; i < s3DownloadedFileDataLineLength - 1; i++) {
                            if (s3DownloadedFileDataLines[i].includes(vins[0]) || s3DownloadedFileDataLines[i].includes(vins[1]) || s3DownloadedFileDataLines[i].includes(vins[2]) || s3DownloadedFileDataLines[i].includes(vins[3]) || s3DownloadedFileDataLines[i].includes(vins[4])) {
                                if (s3DownloadedFileDataLines[i].includes('"isInvalidVin":true')) {
                                    cy.log('Flag is true for invalid vin ')
                                } else {
                                    throw new Error("Flag is not true for all Invalid vins")
                                }

                            } else if (s3DownloadedFileDataLines[i].includes(vins[5])) {
                                if (s3DownloadedFileDataLines[i].includes('"isInvalidVin":false')) {
                                    cy.log('Flag is false for valid vin')
                                } else {
                                    throw new Error("Flag is not false for all valid vin")
                                }
                            } else {
                                throw new Error("Invalid VINs")
                            }
                        }
                        resolve('VerifiedInvalidVins')

                    } else {
                        throw new Error("Transactions are not present in s3");
                    }
                }

            });

        } catch (error) {
            reject('Rejected in uploadedFileVINVerificationInS3 function ')
            cy.error("Error while getting file from s3 bucket", error, error.stack);
        }
    })
}

Cypress.Commands.add('gettranscationpath', () => {
    const moment = require('moment');
    var dateTime = (new Date().toLocaleString().replace(",", ""));
    const formattedDate = moment(dateTime).utc().format('YYYY-MM-DD-HH-mm-ss');
    const utcConvertedDate = moment(dateTime).utc().format('MMMM DD, YYYY HH:mm:ss');
    var utcDate = new Date(utcConvertedDate);
    const path = 'Timestore.txt';
    cy.writeFile(path, formattedDate);
    const year = formattedDate.substring(0, 4);
    const month = formattedDate.substring(5, 7);
    const day = formattedDate.substring(8, 10);
    var hour = parseInt(formattedDate.substring(11, 13)) < 10 ? ('0' + parseInt(formattedDate.substring(11, 13))) : parseInt(formattedDate.substring(11, 13)); //9
    var fullPath = (year.concat('/' + month.concat('/' + day.concat('/' + hour))))
    return cy.wrap({
        fullPath,
        utcDate
    });
})

Cypress.Commands.add('getconcatenatedFilename', (startDate, endDate, invoiceNumber) => {

    const formattedStartDate = startDate.replaceAll('-', '_');
    const formattedEndDate = endDate.replaceAll('-', '_');

    //fetching todays date which is used for concatination
    const today = new Date();
    const dd = today.getDate();
    var day = dd < 10 ? ("0" + dd) : dd;
    const mm = today.getMonth() + 1;
    var month = mm < 10 ? ("0" + mm) : mm;
    const year = today.getFullYear();
    var todayDate = month.toString() + day.toString() + year.toString();
    cy.log('todayDate ' + todayDate);
    const concatenatedFilename = formattedStartDate + "_" + formattedEndDate + "_" + todayDate + "_" + invoiceNumber;
    return cy.wrap(concatenatedFilename);
})

Cypress.Commands.add('postRiskPlusAPIEndpointCall', (numofQuery, vins) => {

    cy.gettranscationpath().then(transpath => {
        return cy.wait(400000).then({
            timeout: 3600000
        }, data => {
            return new Promise((resolve, reject) => {
                processAWSOperations(transpath.fullPath, transpath.utcDate, numofQuery, vins).then(awsOutput => {
                    cy.log('awsOutput ' + awsOutput);
                    resolve(awsOutput);
                });
            })
        });
    });
})

Cypress.Commands.add('getValueFromDropDown', (selector, dropDownValue) => {
    cy.wait(2000);
    cy.get(selector, {
            timeout: 5000
        }).click()
        .get('div')
        .contains(dropDownValue, {
            timeout: 5000
        })
        .click({
            force: true
        });
})
