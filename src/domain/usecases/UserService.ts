import User from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"

export default class UserService {
    UserRepo: UserRepository

    constructor(ir: UserRepository) {
        this.UserRepo = ir
    }

    SignIn(user: User): Promise<User> {
        return this.UserRepo.SignIn(user)
    }

    Register(user: User): Promise<User> {
        return this.UserRepo.Register(user)
    }

    LogOut(): User {
        return this.UserRepo.LogOut()
    }

    onAuthStateChange(user: User): User {
        return this.UserRepo.onAuthStateChange(user)
    }

    CleanState(): User {
        return this.UserRepo.CleanState()
    }
}
