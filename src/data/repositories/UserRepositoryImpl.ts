import User from "../../domain/entities/User"
import { UserRepository } from "../../domain/repositories/UserRepository"
import { firebase } from "../../pages/_app"

export default class UserRepositoryImpl implements UserRepository {
    SignIn = async (user: User): Promise<User> => {
        let newUser
        await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                // Signed in
                const currentUser = userCredential.user
                newUser = new User(currentUser.email, true)
                newUser.uid = currentUser.uid
                // ...
            })
        return newUser
    }

    Register = async (user: User): Promise<User> => {
        let newUser
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                // Signed in
                const currentUser = userCredential.user
                newUser = new User(currentUser.email, true)
                newUser.uid = currentUser.uid
                // ...
            })
        return newUser
    }

    LogOut(): User {
        firebase.auth().signOut()
        return this.CleanState()
    }

    onAuthStateChange = (user: User): User => user

    CleanState = (): User => {
        const cleanedUserState = new User("", false)
        cleanedUserState.password = ""
        cleanedUserState.uid = ""
        return cleanedUserState
    }
}
