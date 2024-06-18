import { COLLECTION_PRODUCTS } from "./constants"
import { getDb } from "./db"
import { ProductModel } from "./types"

export const getAllProduct = async (search: string, page: number, pageSize: number) => {
    const db = await getDb()

    pageSize = pageSize || 4

    const currentPage = Math.max(page, 1)

    const offset = (currentPage - 1) * pageSize

    const query = { name: { $regex: search || "", $options: 'i' } }

    const totalProducts = await db.collection(COLLECTION_PRODUCTS).countDocuments(query)

    const totalPage = Math.ceil(totalProducts / pageSize)

    const validatedCurrentPage = Math.min(currentPage, totalPage)

    const products = await db.collection(COLLECTION_PRODUCTS)
        .find(query)
        .skip(offset)
        .limit(pageSize)
        .toArray() as ProductModel[]

    return {
        currentPage: validatedCurrentPage,
        totalPage,
        data: products
    }
}

export const getProductBySlug = async (slug: string) => {
    const db = await getDb()
    const product = await db.collection(COLLECTION_PRODUCTS).findOne({ slug }) as ProductModel

    return product
}