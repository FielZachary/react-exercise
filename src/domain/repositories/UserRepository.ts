import User from "../entities/User"

export interface UserRepository {
    GetUsers(): Promise<User>
}
