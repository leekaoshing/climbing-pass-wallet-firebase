export default class User {
    constructor(canView, firstName, lastName, email, uid, friends, passes) {
        this.canView = canView
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.uid = uid
        this._friends = friends
        this._passes = passes
    }

    get friends() {
        if (this.canView) {
            return this._friends
        } else {
            throw new Error('Cannot view this user\'s friends.')
        }
    }

    get passes() {
        if (this.canView) {
            return this._passes
        } else {
            throw new Error('Cannot view this user\'s passes.')
        }
    }

    static createUser(canView, firstName, lastName, email, uid, friends, passes) {
        if (canView) {
            return new User(canView, firstName, lastName, email, uid, friends, passes)
        } else {
            return new User(canView, firstName, lastName, email, uid, null, null)
        }
    }
}