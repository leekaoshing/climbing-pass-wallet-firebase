import { createSelector } from '../utils'

describe('Login Page', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/login')
  })

  it('Shows Login Through Google Button', () => {
    cy.url().should('include', '/login')
    cy.get(createSelector('google-auth-button')).should('exist')
  })

  it('Shows signup link', () => {
    cy.url().should('include', '/login')
    cy.get(createSelector('sign-up-link')).click()
    cy.url().should('include', '/signup')
  })

  it('Logs in properly', () => {
    cy.url().should('include', '/login')
    cy.get(createSelector('email-field')).enter('plim@mail.com')
    cy.get(createSelector('password-field')).enter('123456')
    cy.get(createSelector('login-button')).click()

    cy.url().should('include', '/home')

    // TODO Validate that the home screen is correct
  })
})
