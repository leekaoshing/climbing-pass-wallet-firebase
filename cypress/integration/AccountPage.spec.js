import { createSelector } from '../utils'

describe('Account page without authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/account')
  })

  it('Redirects to signup page', () => {
    cy.url().should('include', '/signup')
  })
})

describe('Account page with authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/account')
  })

  it('Updates account correctly', () => { // TODO Create setup and teardown so test state is independent
    cy.login('WjuK3icH37ZC3LjZG6VlN5p4rpw1')
    cy.url().should('include', '/account')

    // Change account details
    cy.get(createSelector('first-name-field')).type('{selectall}{backspace}')
    cy.get(createSelector('first-name-field')).type('Ray')
    cy.get(createSelector('last-name-field')).type('{selectall}{backspace}')
    cy.get(createSelector('last-name-field')).type('Ban')
    cy.get(createSelector('email-field')).type('{selectall}{backspace}')
    cy.get(createSelector('email-field')).type('rban@mail.com')
    cy.get(createSelector('save-changes-button')).click()
    cy.get(createSelector('notification')).should('contain', 'Profile updated successfully!')
  })

  it('Shows error if trying to change email to one that is already in use', () => { // TODO Create setup and teardown so test state is independent
    cy.login('WjuK3icH37ZC3LjZG6VlN5p4rpw1')
    cy.url().should('include', '/account')

    // Change account details
    cy.get(createSelector('first-name-field')).type('{selectall}{backspace}')
    cy.get(createSelector('first-name-field')).type('Ray')
    cy.get(createSelector('last-name-field')).type('{selectall}{backspace}')
    cy.get(createSelector('last-name-field')).type('Ban')
    cy.get(createSelector('email-field')).type('{selectall}{backspace}')
    cy.get(createSelector('email-field')).type('otan@mail.com')
    cy.get(createSelector('save-changes-button')).click()
    cy.get(createSelector('notification')).should('contain', 'Error updating profile: The email address is already in use by another account.')
  })
})