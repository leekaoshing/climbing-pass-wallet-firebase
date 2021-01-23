import { createSelector } from '../utils'

describe('Signup without authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/signup')
  })

  it('Has link to About page', () => {
    cy.get(createSelector('about')).click()
    cy.url().should('include', '/about')
    // cy.go('back')
  })

  it('Has link to Login page', () => {
    // cy.get('.sidebar').scrollTo('bottom')
    cy.get(createSelector('login')).click()
    cy.url().should('include', '/login')
  })

  it('Shows signup Through Google Button', () => {
    cy.get(createSelector('google-auth-button')).should('exist')
  })  

  it('Should signup properly', () => {
    cy.get(createSelector('first-name-field')).type('Peter')
    cy.get(createSelector('last-name-field')).type('Lim')
    cy.get(createSelector('email-field')).type('plim@mail.com')
    cy.get(createSelector('password-field')).type('123456')
    cy.get(createSelector('password-confirmation-field')).type('123456')
    cy.get(createSelector('sign-up-button')).click()

    cy.url().should('include', '/home')

    // TODO Validate that the home screen is correct
  })  
})

// describe('Signup with authentication', () => {
//   beforeEach(() => {
//     cy.login()
//     cy.visit('localhost:3000/signup')
//   })

//   it('should redirect to home', () => {
//     cy.url().should('include', '/home')
//   })

//   // TODO Follow sign up process
// })

// TODO Signup with authentication