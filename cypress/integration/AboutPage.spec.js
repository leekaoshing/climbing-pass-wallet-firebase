import { createSelector } from '../utils'

describe('About', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('localhost:3000/about')
  })

  it('Shows about information', () => {
    cy.get(createSelector('email-enquiries-paragraph')).should('exist')
  })  
})