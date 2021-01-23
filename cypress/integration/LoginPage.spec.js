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
    // Set up test user // TODO Fix
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@mail.com',
      password: '123456'
    }
    // cy.createUser(testUser).then(uid => {
      // cy.callFirestore('set', `users/123`, {
      //   hello: 'there'
      // })
      cy.addInfo()
      cy.log('created store for user')
      cy.url().should('include', '/login')
      cy.wait(50)
  
      cy.get(createSelector('email-field')).type(testUser.email)
      cy.get(createSelector('password-field')).type(testUser.password)
      cy.get(createSelector('login-button')).click()
  
      cy.url().should('include', '/home')
      cy.get(createSelector('user-name-card')).should('contain', 'Test User')
    // })
    

    // TODO Validate that the home screen is correct
  })
})
