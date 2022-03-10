Install: npm i

Open: npx cypress open --env configFile={env name}

Run headlessly and record report: npx cypress run --env configFile={env name} --record --key 9a06cf2f-91a4-4ae7-a379-e423591c21b7

Run headed and submit report: npx cypress run --env configFile={env name} --record --key 9a06cf2f-91a4-4ae7-a379-e423591c21b7 --headed

=================================================================================================================

# Prerequisites to configure before running the AutocheckBilling tests:

- Run the below command to get dependencies in your cypress project folder(Run this command everytime when you pull the code).

```sh
npm install
```

- Change accessKey and secretKey as per your AWS credentials in dev.json(Make sure you have access permission to s3, aws Glue and Athena).
- In cypress.json, video is set to false, if want to get a video of running tests, set it to true in cypress.json.

- Run the below command to run all the tests under AutoCheckBillingTests folder.

```sh
npx cypress run --spec "cypress/integration/AutoCheckBillingTests/*.js" (Without launching browser)  or
npx cypress run --spec "cypress/integration/AutoCheckBillingTests/*.js" --browser chrome(With launching browser)
```

- Run the below command to run single tests under AutoCheckBillingTests folder: For example:

```sh
npx cypress run --spec "cypress/integration/AutoCheckBillingTests/billingInformationScreen.spec.js" (Without launching browser)  or
npx cypress run --spec "cypress/integration/AutoCheckBillingTests/billingInformationScreen.spec.js" --browser chrome(With launching browser)
```
