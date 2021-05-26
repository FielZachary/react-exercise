import User from "../entities/User"

export interface UserRepository {
    SignIn(user: User): Promise<User>
    Register(user: User): Promise<User>
    LogOut(): User
    onAuthStateChange(user: User): User
    CleanState(): User
}
