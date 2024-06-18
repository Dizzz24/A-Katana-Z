import { getAllProduct } from "@/app/db/models/products";
import { type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams
        const search = params.get('search') || ''
        const page = params.get('page') || '1'
        const pageSize = params.get('pageSize') || '4'

        const products = await getAllProduct(search, +page, +pageSize)

        return Response.json({
            ...products
        },
            { status: 200 })
    } catch (error) {
        console.log(error, "<<< ==== error on API/Product GET")
        return Response.json({
            message: "Something went wrong :" + 'error'
        },
            { status: 500 })
    }
}