import { Product } from "../entities/Product"

export interface ProductRepository {
    GetProduct(): Promise<Product[]>
}
