import axios from "axios"

import UserDTO from "../../domain/DTOs/UserDTO"
import User from "../../domain/entities/User"
import { UserRepository } from "../../domain/repositories/UserRepository"

const Axios = axios.create({
    baseURL: "https://reqres.in",
})

export default class UserRepoImplement implements UserRepository {
    jsonUrl = "/api/users?page=2"

    async GetUsers(): Promise<User> {
        const response = await Axios.get(this.jsonUrl)
        return response.data.data.map((user: UserDTO) => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }))
    }
}
