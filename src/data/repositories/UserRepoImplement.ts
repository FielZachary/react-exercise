import axios from "axios"

import { User } from "../../domain/entities/User"
import { UserRepository } from "../../domain/repositories/UserRepository"

const Axios = axios.create({
    baseURL: "https://reqres.in",
})

class UserDTO {
    id: number

    email: string

    first_name: string

    last_name: string
}

export class UserRepoImplement implements UserRepository {
    async GetUsers(): Promise<User> {
        //console.log("getting users")
        const response = await Axios.get("/api/users?page=2")
        //console.log("after response")
        //console.log(response.data.data)
        return response.data.data.map((user: UserDTO) => ({
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
        }))
    }
}
