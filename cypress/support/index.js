import './commands'
// Hide fetch/XHR requests from command log
Cypress.Server.defaults({
  delay: 500,
  force404: false,
  ignore: (xhr) => {
  return true;
  }
  }) 