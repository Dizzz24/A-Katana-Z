import { getProductBySlug } from "@/app/db/models/products";
import { useRouter } from "next/router";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params
        const product = await getProductBySlug(slug)
        let message = "success"

        if (!product) {
            message = "data not found"
        }

        return Response.json({
            data: product || {},
            message
        }, { status: 200 });
    } catch (error) {
        console.log(error, "ini error detail slug");
        return Response.json({
            message: "Internal Server Error"
        }, { status: 500 });
    }
}