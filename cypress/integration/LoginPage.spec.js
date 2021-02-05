import { createSelector } from '../utils'

describe('Login page with authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/login')
  })

  it('Should redirect to home', () => {
    cy.login('HMJnZ9L73HqjMIkvWel8zMMbVTrI')
    cy.url().should('include', '/home')
  })
})

describe('Login Page', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/login')
  })

  // it('Shows Login Through Google Button', () => {
  //   cy.url().should('include', '/login')
  //   cy.get(createSelector('google-auth-button')).should('exist')
  // })

  it('Shows signup link', () => {
    cy.url().should('include', '/login')
    cy.get(createSelector('sign-up-link')).click()
    cy.url().should('include', '/signup')
  })

  it('Logs in properly', () => {
    // cy.login('WjuK3icH37ZC3LjZG6VlN5p4rpw1')
    // Set up test user // TODO Fix
    // const testUser = {
    //   firstName: 'Test',
    //   lastName: 'User',
    //   email: 'testuser@mail.com',
    //   password: '123456'
    // }
    // cy.createUser(testUser).then(uid => {

      // cy.logout()
      // cy.callFirestore('set', `users/${uid}`, {
      //   hello: 'there'
      // })
    // })
      
      cy.url().should('include', '/login')
      cy.wait(50)
  
      cy.get(createSelector('email-field')).type('rban@mail.com')
      cy.get(createSelector('password-field')).type('123456')
      // cy.get(createSelector('email-field')).type(testUser.email)
      // cy.get(createSelector('password-field')).type(testUser.password)
      cy.get(createSelector('login-button')).click()
  
      cy.url().should('include', '/home')
      cy.get(createSelector('user-name-card')).should('contain', 'Ray Ban')
      // cy.get(createSelector('user-name-card')).should('contain', 'Test User')
    // })
    
  })
})
