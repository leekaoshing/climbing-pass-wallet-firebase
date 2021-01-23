import { createSelector } from '../utils'

// describe('Home without authentication', () => {
//   beforeEach(() => {
//     cy.logout()
//     cy.visit('localhost:3000/home')
//   })

//   it('Redirects to signup page', () => {
//     cy.url().should('include', '/signup')
//   })
// })

describe('Home with authentication', () => {
  beforeEach(() => {
    cy.logout()
  })

  it('Shows user details and can add a friend', () => {
    cy.callFirestore("get", `users`).then((r) => {
      cy.log("get returned: ", r);
    });


    cy.login('gYKoNwHzQ41AWVWImxvGYbAuKJze')
    cy.visit('localhost:3000/home')
    cy.wait(10)
    cy.url().should('include', '/home')
    cy.get(createSelector('first-name-field')).should('not.exist')
    // TODO
  })

  // it('Can see passes of someone who has added them', () => {
  //   cy.login() // TODO Login to second user
  //   cy.visit('localhost:3000/home')
  //   cy.get(createSelector('user-search-field')).enter('otan@mail.com')
  //   cy.get(createSelector('user-search-button')).click()
  //   cy.get(createSelector('user-name-panel')).should('contain', 'Oliver Tan')
  //   // TODO Finish
  // })

})