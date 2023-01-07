/* global describe beforeEach cy it Cypress */



Cypress.Commands.add('win', () => { 
  cy.visit('http://localhost:8080');
  cy.get('button[name="0"]').click();
  cy.get('button[name="1"]').click();
  cy.get('button[name="4"]').click();
  cy.get('button[name="5"]').click();
  cy.get('button[name="8"]').click();
});

