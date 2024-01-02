Summary : 

This project has been developed using Cypress.io which is based on Javascript. The project structure consists of 3 stages: E2E, Pages, and Fixtures.

Within the E2E file, there are test scenarios organized based on pages. The Fixtures files contains page-based web elements. Under the Pages file, there are test methods.

In the package.json file, there are detailed test script commands on how tests should be executed.


# Clone the repository
git clone https://github.com/ekaragozoglu/enUygun.git

# Go project directory
cd enUygun

# Install dependencies
rm -rf node_modules

npm install

# Run tests headlessly
npx cypress run 

# Open Cypress Test Runner
npx cypress open 

# Clean old reports
rm -rf report cypress/screenshots cypress/reports cypress/videos runner-results 
multi-reporter-config.json cypress/parallel-weights.json

# Create report using Mochawesome html reporting
npm run report:clean; npm run cy:parallel-test; npm run report:merge && npm run report:build