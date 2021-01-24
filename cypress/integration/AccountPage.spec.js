import { createSelector } from '../utils'

describe('Account without authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/account')
  })

  it('Redirects to signup page', () => {
    cy.url().should('include', '/signup')
  })
})

describe('Account with authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.login('gYKoNwHzQ41AWVWImxvGYbAuKJze')
    cy.visit('localhost:3000/account')
  })

  it('Updates account correctly', () => {
    cy.url().should('include', '/account')
  })
})