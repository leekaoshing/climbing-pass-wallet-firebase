import { createSelector } from '../utils'

describe('Home without authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/home')
  })

  it('Redirects to signup page', () => {
    cy.url().should('include', '/signup')
  })
})

describe('Home with authentication', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('localhost:3000/home')
  })

  it('Shows user details', () => {
    cy.url().should('include', '/home')
    // TODO
  })
})