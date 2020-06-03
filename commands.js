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
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('adminLogin', (
  email = Cypress.env('adminUserName'),
  password = Cypress.env('adminPassword'),
) => {
  Cypress.log({
    name: 'Admin Log in ',
    message: 'Manually logging in an admin via form on /login',
  });
  cy.visit('/login');
  cy.get('.Login__swapClientTypeText', { timeout: 7500 }).as('portalToggle');
  cy.get('@portalToggle').then(($btn) => {
    if ($btn.text().includes('Administrator Login')) {
      cy.get('.Login__swapClientTypeButton').click();
      cy.reload();
    }
  });
  cy.get('input[type="email"]').first().type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('.LoginActionButton__button').click();
  cy.url({ timeout: 10000 }).should('match', /users/);
});

Cypress.Commands.add('userLogin', (
  email = Cypress.env('userUserName'),
  password = Cypress.env('userPassword'),
) => {
  Cypress.log({
    name: 'User Log in ',
    message: 'Manually logging in a user via form on /login',
  });

  cy.visit('/login');
  cy.get('.Login__swapClientTypeText', { timeout: 10000 }).as('portalToggle');
  cy.get('@portalToggle').then(($btn) => {
    if ($btn.text().includes('User Portal Login')) {
      cy.get('.Login__swapClientTypeButton').click();
      cy.reload();
    }
  });
  cy.get('input[type="email"]').first().type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('.LoginActionButton__button').click();
  cy.url({ timeout: 10000 }).should('match', /userconsole/);
});

// cypress' createOrg uses the python create_org, which works on
// "env": "<local|local_web_app|awsstg_1>"
// so, it cannat be used for GCE staging testing.
// To test on GCE, change cypress.json baseUrl and supply the adminLogin method credentials

Cypress.Commands.add('createOrg', (orgSpecs = { env: 'awsstg_1' }) => {
  const orgInfo = {};
  const envs = ['local', 'local_web_app', 'awsstg_1'];

  if (envs.indexOf(orgSpecs.env) < 1) {
    cy.log('orgSpec needs to be one of', envs.join());
    // return;
  }

  return cy.request({
    method: 'POST',
    url: Cypress.env('registerOrgUrl'),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(orgSpecs),
  }).then((response) => {
    expect(response.status).to.eq(200);
    orgInfo.apiKey = response.body.description.api_key;
    orgInfo.orgId = response.body.description.organization;
    orgInfo.adminUserName = response.body.description.email;
    orgInfo.adminPassword = 'test';


    Cypress.log({
      name: 'Org info ',
      message: `UN: ${orgInfo.adminUserName}, PW: ${orgInfo.adminPassword}, apiKey: ${orgInfo.apiKey}, orgId: ${orgInfo.orgId}`,
    });
    return orgInfo;
  });
});

// Cypress.Commands.add('orgSpecs', (...) => {
//   skeleton json for py create_org
//   get py config, delete some stuff
//   create factories
//   use factory to build json config
//   example at https://github.com/TheJumpCloud/jumpcloud-acceptance/blob/master/configs/ci_api_tests_config.json
// });

Cypress.Commands.add('applicationLogin', (
  email = Cypress.env('applicationUserName'),
  password = Cypress.env('applicationUserPassword'),
  application = Cypress.env('applicationAbbreviation'),
) => {
  Cypress.log({
    name: 'Application Log in ',
    message: 'Manually logging in a user to an SSO SAML application',
  });

  cy.visit(`/login?context=sso&redirectTo=saml2/${application}`);
  cy.get('input[type="email"]').first().type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('.LoginActionButton__button LoginActionButton__successButton').click();
  cy.url({ timeout: 10000 }).should('match', destination);
});
