export default class Product {
    id: number

    name: string

    year: number

    color: string

    constructor(id: number, name: string, year: number, color: string) {
        this.id = id
        this.year = year
        this.name = name
        this.color = color
    }
}
