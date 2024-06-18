import { getAllWishlist } from "@/app/db/models/wishlist";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const headersList = headers()

        const userId = (headersList.get("x-user-id")) as string

        const wishlists = await getAllWishlist(userId)

        return Response.json({
            data: wishlists || {},
        }, { status: 200 });
    } catch (error) {
        console.log(error, "ini error");
        return Response.json({
            message: "Internal Server Error"
        }, { status: 500 });
    }
}