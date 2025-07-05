import { first } from 'lodash'
import userData from '../fixtures/userData.json'

describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: '.oxd-button',
    sectionTitleTopBar: '.oxd-topbar-header-breadcrumb-module',
    wrongCredentialAlert: "[role= 'alert']",
    dashboardGrid: '.orangehrm-dashboard-grid',
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: '[placeholder="yyyy-dd-mm"]',
    dateCloseButton: ".--close",
    submitbutton: "[type='submit']"
  }

  it.only('User info update - Sucess', () => {
    cy.visit('auth/login')
    cy.get( selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click ()
    cy.location('pathname').should ('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorsList.lastNameField).clear().type('LastNameTest')
    cy.get(selectorsList.genericField).eq(2).clear().type('NicknameTest')
    cy.get(selectorsList.genericField).eq(3).clear().type('EmployeeId')
    cy.get(selectorsList.genericField).eq(4).clear().type('OtherIdtest')
    cy.get(selectorsList.genericField).eq(5).clear().type('DriverTest')
    cy.get(selectorsList.genericField).eq(6).clear().type('2025-07-02')
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.submitbutton).eq(0).click()
    cy.get('body').should('contain', 'Successfully Updated')
  })


  it('Login - Fail', () => {
    cy.visit('auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click ()
    cy.get(selectorsList.wrongCredentialAlert)
  })

})