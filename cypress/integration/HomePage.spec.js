import { createSelector } from '../utils'

describe('Home page without authentication', () => {
	beforeEach(() => {
		cy.logout()
		cy.visit('localhost:3000/home')
	})

	it('Redirects to signup page', () => {
		cy.url().should('include', '/signup')
	})
})

describe('Home page with authentication', () => { // TODO Create setup and teardown so test state is independent
	beforeEach(() => {
		cy.logout()
	})

	// Test state assumptions:
	// Ray Ban has added Oliver Tan as a friend
	// Ray Ban has not added Test Three as a friend
	// Oliver Tan and Test Three have not added Ray Ban as a friend
	it('Can search for people and view friends', () => {
		cy.login('HMJnZ9L73HqjMIkvWel8zMMbVTrI')
		cy.visit('localhost:3000/home')
		cy.wait(10)
		cy.url().should('include', '/home')
		cy.get(createSelector('first-name-field')).should('not.exist')

		// Select and view a friend
		cy.get(createSelector('view-friends-button')).click()
		// cy.wait(200)
		cy.get(createSelector('select-friend-checkbox')).eq(1).click()
		cy.get(createSelector('view-friends-ok')).click()
		cy.get(createSelector('user-name-card')).should('contain', 'Test Two')

		// // Deselect the friend
		cy.get(createSelector('view-friends-button')).click()
		cy.get(createSelector('select-friend-checkbox')).eq(1).click()
		cy.get(createSelector('view-friends-ok')).click()
		cy.get(createSelector('user-name-card')).should('not.contain', 'Test Two')

		// Search for friend via email instead
		cy.get(createSelector('user-search-field')).type('test2@mail.com')
		cy.get(createSelector('user-search-button')).click()
		cy.get(createSelector('user-name-card')).should('contain', 'Test Two')

		// Friend should be selected in the View Friends menu, so this should deselect the friend
		cy.get(createSelector('view-friends-button')).click()
		cy.get(createSelector('select-friend-checkbox')).eq(1).click()
		cy.get(createSelector('view-friends-ok')).click()
		cy.get(createSelector('user-name-card')).should('not.contain', 'Test Two')

		// Search for a person and add them as friend
		cy.get(createSelector('user-search-field')).type('test3@mail.com')
		cy.get(createSelector('user-search-field')).type('{enter}')
		cy.get(createSelector('user-name-card')).should('contain', 'Test Three')
		cy.get(createSelector('not-friend')).should('contain', 'This person has not added you as a friend yet.') // Assumes Test Three has not yet added Ray Ban as a friend
		cy.get(createSelector('user-name-card')).should('not.contain', 'Test Two')
		cy.get(createSelector('add-friend-button')).click()
		cy.get(createSelector('notification')).should('contain', 'Successfully added Test Three to friend list.')

		// Deselect the new friend
		cy.get(createSelector('view-friends-button')).click()
		cy.get(createSelector('select-friend-checkbox')).eq(2).click()
		cy.get(createSelector('view-friends-ok')).click()
		cy.get(createSelector('user-name-card')).should('not.contain', 'Test Three')
		cy.get(createSelector('user-name-card')).should('not.contain', 'Test Two')

		// Reselect the new friend
		cy.get(createSelector('view-friends-button')).click()
		cy.get(createSelector('select-friend-checkbox')).eq(2).click()
		cy.get(createSelector('view-friends-ok')).click()
		cy.get(createSelector('user-name-card')).should('contain', 'Test Three')
		cy.get(createSelector('user-name-card')).should('not.contain', 'Test Two')

		cy.get(createSelector('remove-friend-button')).click()
		cy.get(createSelector('remove-friend-confirmation-button')).click()
		cy.get(createSelector('notification')).should('contain', 'Successfully removed Test Three from friend list.')
	})

	it('Shows user details and can change own passes', () => {
		cy.login('WjuK3icH37ZC3LjZG6VlN5p4rpw1')
		cy.visit('localhost:3000/home')
		cy.wait(10)
		cy.url().should('include', '/home')
		cy.get(createSelector('first-name-field')).should('not.exist')

		// Add gym M1
		cy.get(createSelector('add-gym-button')).click()
		cy.get(createSelector('add-gym-M1')).click()
		cy.get(createSelector('passes-M1')).should('contain', '0')

		// Add gym M2
		cy.get(createSelector('add-gym-button')).click()
		cy.get(createSelector('add-gym-M2')).click()
		cy.get(createSelector('passes-M2')).should('contain', '0')

		// Add 2 passes for M1
		cy.get(createSelector('decrement-pass-M1')).click()
		cy.get(createSelector('increment-pass-M1')).click()
		cy.get(createSelector('increment-pass-M1')).click()
		cy.get(createSelector('passes-M1')).should('contain', '2')

		// Add 1 pass for M2
		cy.get(createSelector('increment-pass-M2')).click()
		cy.get(createSelector('increment-pass-M2')).click()
		cy.get(createSelector('decrement-pass-M2')).click()
		cy.get(createSelector('passes-M2')).should('contain', '1')

		// Reset passes
		cy.get(createSelector('reset-changes-button')).click()
		cy.get(createSelector('passes-M1')).should('not.exist')
		cy.get(createSelector('passes-M2')).should('not.exist')
		cy.get(createSelector('no-passes')).should('exist')

		// Add gym M3
		cy.get(createSelector('add-gym-button')).click()
		cy.get(createSelector('add-gym-M3')).click()
		cy.get(createSelector('passes-M3')).should('contain', '0')

		// Add 3 passes for M3
		cy.get(createSelector('increment-pass-M3')).click()
		cy.get(createSelector('increment-pass-M3')).click()
		cy.get(createSelector('increment-pass-M3')).click()
		cy.get(createSelector('passes-M3')).should('contain', '3')

		// Submit changes
		cy.get(createSelector('save-changes-button')).click()
		cy.get(createSelector('confirmation-list-M3')).should('contain', '+3')
		cy.get(createSelector('save-changes-confirmation-button')).click()
		cy.get(createSelector('update-results-message')).should('contain', 'Successfully updated!')

		// Refresh the page, changes should persist
		cy.visit('localhost:3000/home')
		cy.wait(10)
		cy.get(createSelector('passes-M3')).should('contain', '3')

		// Manually reset M3 to 0
		cy.get(createSelector('decrement-pass-M3')).click()
		cy.get(createSelector('decrement-pass-M3')).click()
		cy.get(createSelector('decrement-pass-M3')).click()

		// Submit changes
		cy.get(createSelector('save-changes-button')).click()
		cy.get(createSelector('save-changes-confirmation-button')).click()
		cy.get(createSelector('update-results-message')).should('contain', 'Successfully updated!')

		// Refresh the page, all passes should be 0
		cy.visit('localhost:3000/home')
		cy.wait(10)
		cy.get(createSelector('passes-M1')).should('not.exist')
		cy.get(createSelector('passes-M2')).should('not.exist')
		cy.get(createSelector('passes-M3')).should('not.exist')
		cy.get(createSelector('no-passes')).should('contain', 'No passes here yet. Try adding some!')
	})
})