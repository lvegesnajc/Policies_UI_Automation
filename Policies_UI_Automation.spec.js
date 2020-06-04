
import * as cypressEnv from '../../cypress.env.json';
import * as cypressJson from '../../cypress.json';
//import { WatchIgnorePlugin } from 'webpack';
const checkbox = 'input[type="checkbox"]';
//const checkbox = '.ItemTable__tableHeadCell .ItemTable__rowCheckbox';


    it ('Login', function()
    {
      cy.adminLogin();
    })

   it ('Add User', function()
    {
      cy.get('.jc-actions-add')
      //Adding user via API
      cy.request({
        method: 'POST',
        url: 'localhost/api/systemusers',
          body:{
            username:'cypresstest1',
            email:'cypresstest1@test.com',
            firstname:'Cypress',
            lastname:'Test1'
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-api-key': '8f2bcc9fe244d861e56805ff25d86e2defc363a4',
                },
        }).then((respond) =>
        {
          expect(respond.status).to.eq(200)
          expect(respond.body).to.not.be.null
        })
        cy.visit('http://localhost/#/users')
        //cy.contains('cypresstest1@test.com')
    }) 


    describe('Policies', function()
    {

    it ('Click Policies', function()
    {
        cy.contains('Policies').click();
        cy.contains('My Policies');
    }) 

    it ('When the org has no policies, the Getting Started page is displayed ', function()
    {
        cy.contains('Create a policy and secure your fleet')
        cy.contains('Create policies to secure and manage the systems (Mac, Windows, Linux) in your organization. learn more')
    }) 

    it ('New Policy Added and edit policy', function()
    {
        cy.contains('Policies').click();
        cy.get('.jc-actions-add').click();
        //cy.wait(2000);
        //Click on Mac to select a Mac Policy
        cy.get('.AsidePanel__bodyNavItem:nth-child(2) .AsidePanel__bodyNavItemLinkLabel').click();
        cy.wait(3000);
        //Click on the first available Mac Policy
        cy.get('.AsidePanel__bodyContent:nth-child(3) .ItemTable__tableBodyRow:nth-child(1) .FlatActionButton__content:nth-child(1)').click();
        cy.contains('Policy Name');
        cy.contains('Policy Description');
        cy.contains('Settings');
        cy.contains('save policy').click();
        
    }) 

    it ('Click on policy and add to a system', function()
    {
      //cy.contains('Policies').click();
      cy.visit('http://localhost/#/policies');
      //Click on the Policy
      cy.get('.ItemName__title').click();
      //Click on System Groups
      cy.get('.tab-bar-tab:nth-child(2) > span').click();
      //Add to Mac Systems
      cy.get('.ItemTable__tableBodyRow:nth-child(3) .ItemTable__rowCheckbox').click();
      cy.get('.btn').click();
      //cy.get('.actions > a').click();
    }) 

    it ('click on policy', function()//PASS
    {
      //cy.contains('Policies').click();
      cy.visit('http://localhost/#/policies');
      //cy.get('.NavPanelLink__active > .NavPanelLink__navLinkText').click();
      cy.get('.ItemTable__mainPanelTableBodyRow:nth-child(1) .ItemName__title').click();
      cy.get('.actions > a').click();

    }) 

    it ('Remove Selected Policies', function()
    {
        //Can select all policies for this org
        cy.get('.ItemTable__tableContainerInMainPanel .ItemTable__tableHeadCell .ItemTable__rowCheckbox').click();
        //Can deselect all policies for this org
         cy.get('.ItemTable__tableContainerInMainPanel .ItemTable__tableHeadCell .ItemTable__rowCheckbox').click();
         //Can select policies again to remove
          cy.get('.ItemTable__tableContainerInMainPanel .ItemTable__tableHeadCell .ItemTable__rowCheckbox').click();
        cy.get('.btnAlert').click();
        cy.get('.FlatActionButton__text').click();
        //Confirm all policies are deleted
        cy.contains('Create a policy and secure your fleet')
    }) 

     it ('Remove User', function()//PASS
    {
        cy.visit('http://localhost/#/users');
        //cy.get('.NavPanelLink__active > .NavPanelLink__navLinkText').click();

        cy.get('.ItemTable__tableHeadCell .ItemTable__rowCheckbox').click();
        cy.get('.btnAlert').click();
        cy.get('.Input__input').type('1');
        cy.get('.FlatActionButton__text:nth-child(1)').click();
        cy.get('.AlertContainer__container').click();
        //cy.wait(9000);

    }) 

    it ('Logout', function()//PASS
    {
        //cy.visit('http://localhost/#/policies');
        //cy.get('.AccountDetailsDropdown__dropDownToggle').click();
        //cy.get('li:nth-child(9) .DropDownList__menuItemLabel').click();
        //cy.contains('Logout').click();
        cy.visit('http://localhost/logout')

    })  
    
   
})



