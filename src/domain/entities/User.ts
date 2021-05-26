export default class User {
    uid: string

    email: string

    isSignedIn: boolean

    password: string

    constructor(email: string, isSignedIn: boolean) {
        this.email = email
        this.isSignedIn = isSignedIn
    }
}
