import { createSelector } from '../utils'

describe('Signup page without authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/signup')
  })

  it('Has links to About and Login pages', () => {
    cy.get(createSelector('about')).should('exist')
    cy.get(createSelector('login')).should('exist')
  })

  // it('Shows signup Through Google Button', () => {
  //   cy.get(createSelector('google-auth-button')).should('exist')
  // })  

  it('Should signup properly', () => {
    cy.get(createSelector('first-name-field')).type('Test')
    cy.get(createSelector('last-name-field')).type('User')
    cy.get(createSelector('email-field')).type('testuser@mail.com')
    cy.get(createSelector('password-field')).type('123456')
    cy.get(createSelector('password-confirmation-field')).type('123456')
    cy.get(createSelector('sign-up-button')).click()

    cy.url().should('include', '/home')
    cy.get(createSelector('user-name-card')).should('contain', 'Test User')
    cy.get(createSelector('no-passes')).should('contain', 'No passes here yet. Try adding some!')
    cy.deleteCurrentUser()
  })
})

describe('Signup page with authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/signup')
  })

  it('Should redirect to home', () => {
    cy.login('HMJnZ9L73HqjMIkvWel8zMMbVTrI')
    cy.url().should('include', '/home')
  })
})