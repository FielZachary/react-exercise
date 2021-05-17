import axios from "axios"

import ProductDTO from "../../domain/DTOs/ProductDTO"
import Product from "../../domain/entities/Product"
import { ProductRepository } from "../../domain/repositories/ProductRepository"

const Axios = axios.create({
    baseURL: "https://reqres.in",
})

export default class ProductRepoImplement implements ProductRepository {
    jsonUrl = "/api/products"

    async GetProduct(): Promise<Product[]> {
        const response = await Axios.get(this.jsonUrl)

        return response.data.data.map((product: ProductDTO) => ({
            id: product.id,
            name: product.name,
            year: product.year,
            color: product.color,
        }))
    }
}
