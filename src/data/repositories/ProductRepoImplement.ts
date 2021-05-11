import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://reqres.in'
})

class ProductDTO {
    id: number
    name: string
    year: number
    color: string
}

export class ProductRepoImplement implements ProductRepository {

    async GetProduct(): Promise<Product[]> {
        const response = await Axios.get('/api/products')
        
        return response.data.data.map((product: ProductDTO) => (
            {
                id: product.id,
                name: product.name,
                year: product.year,
                color: product.color
            }
        ))
    }
}

