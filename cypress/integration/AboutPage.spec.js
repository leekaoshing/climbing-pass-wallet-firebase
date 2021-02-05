import { createSelector } from '../utils'

describe('About page without authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/about')
  })

  it('Shows about information', () => {
    cy.get(createSelector('image-guide')).should('exist')
    cy.get(createSelector('email-enquiries-paragraph')).should('exist')
    cy.get(createSelector('log-in-button')).should('exist')
    cy.get(createSelector('sign-up-button')).should('exist')
    cy.get(createSelector('home-button')).should('not.exist')
  })  
})

describe('About page with authentication', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/about')
  })

  it('Shows about information', () => {
    cy.login('HMJnZ9L73HqjMIkvWel8zMMbVTrI')
    cy.get(createSelector('image-guide')).should('exist')
    cy.get(createSelector('email-enquiries-paragraph')).should('exist')
    cy.get(createSelector('log-in-button')).should('not.exist')
    cy.get(createSelector('sign-up-button')).should('not.exist')
    cy.get(createSelector('home-button')).should('exist')
  })  
})