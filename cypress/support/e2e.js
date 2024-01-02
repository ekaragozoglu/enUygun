import './commands'
import addContext from 'mochawesome/addContext';
import 'cypress-plugin-steps';
import 'cypress-localstorage-commands';
import 'cypress-real-events/support';
import 'cypress-real-events';

const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()

Cypress.on("test:after:run", (test, runnable) => {
    if (test.state === "failed") {
        const screenshot = `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
        addContext({test}, screenshot);
    }
});
beforeEach(() => {
    cy.intercept('GET', 'https://www.enuygun.com/').as('xhrDisabled')
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.visit('/') 
});