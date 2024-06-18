import { addWishlist, deleteWishlist } from "@/app/db/models/wishlist";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const headersList = headers()
        const userId = (headersList.get("x-user-id")) as string

        const wishlists = await addWishlist(userId, params.id)

        return Response.json({
            message: wishlists.message,
        }, { status: 200 });
    } catch (error) {
        console.log(error, "ini error");
        return Response.json({
            message: "Internal Server Error"
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const wishlistId = params.id
        const message = await deleteWishlist(wishlistId)

        return Response.json({
            data: {
                message
            },
        }, { status: 200 });
    } catch (error) {
        console.log(error, "ini error");
        return Response.json({
            message: "Internal Server Error"
        }, { status: 500 });
    }
}