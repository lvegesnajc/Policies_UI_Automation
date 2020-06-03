
import * as cypressEnv from '../../cypress.env.json';
import * as cypressJson from '../../cypress.json';
const checkbox = 'input[type="checkbox"]';
//const checkbox = '.ItemTable__tableHeadCell .ItemTable__rowCheckbox';


    it ('Login', function()//Login
    {
      cy.adminLogin();
    })

    it ('Add User', function()//Login
    {
      cy.get('.jc-actions-add')
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
    })


    describe('Policies', function()
    {

    it ('Click Policies', function()//PASS
    {
        cy.contains('Policies').click();
    })

    it ('When the org has no policies, the Getting Started page is displayed ', function()//PASS
    {
        cy.contains('Create a policy and secure your fleet')
        cy.contains('Create policies to secure and manage the systems (Mac, Windows, Linux) in your organization. learn more')
    })

   /*  it ('Clicking the + icons opens the add policy menu ', function()//PASS
    {
        cy.get('.jc-actions-add').click();
        cy.contains('New Linux Policy');
        cy.contains('New Mac Policy');
        cy.contains('New Windows Policy');
    }) */

    it ('New Policy Added and edit policy', function()//PASS
    {
        cy.get('.jc-actions-add').click();
        cy.get('.AsidePanel__bodyNavItem:nth-child(3) .AsidePanel__bodyNavItemLinkLabel').click();
        cy.get('.AsidePanel__bodyContent:nth-child(4) .ItemTable__tableBodyRow:nth-child(1) .FlatActionButton__content:nth-child(1)').click();
        cy.get('.btn').click();
        
        //cy.contains('save policy').click();
    })

    it ('Click on policy and add to a system', function()//PASS
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

    it ('Remove Selected Policies', function()//PASS
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

    /* it ('Logout', function()//PASS
    {
        //cy.visit('http://localhost/#/policies');
        //cy.get('.AccountDetailsDropdown__dropDownToggle').click();
        //cy.get('li:nth-child(9) .DropDownList__menuItemLabel').click();
        //cy.contains('Logout').click();
        cy.visit('http://localhost/logout')

    }) */
    
   
})



