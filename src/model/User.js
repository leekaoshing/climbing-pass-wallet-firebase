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
        return this.canView ? this._friends : []
    }

    get passes() {
        return this.canView ? this._passes : {}
    }

    static createUser(canView, firstName, lastName, email, uid, friends, passes) {
        if (canView) {
            return new User(canView, firstName, lastName, email, uid, friends, passes)
        } else {
            return new User(canView, firstName, lastName, email, uid, null, null)
        }
    }
}