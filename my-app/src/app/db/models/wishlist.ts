import { ObjectId } from "mongodb"
import { COLLECTION_WISHLIST } from "./constants"
import { getDb } from "./db"
import { WishlistModel } from "./types"

export const getAllWishlist = async (userId: string) => {
    const db = await getDb()
    const query = [
        {
            '$match': {
                'userId': new ObjectId(userId)
            }
        }, {
            '$lookup': {
                'from': 'Products',
                'localField': 'productId',
                'foreignField': '_id',
                'as': 'Product'
            }
        }, {
            '$unwind': {
                'path': '$Product'
            }
        }
    ]

    const wishlists = await db.collection(COLLECTION_WISHLIST).aggregate(query).toArray() as WishlistModel[]

    return wishlists
}

export const addWishlist = async (userId: string, productId: string) => {
    const db = await getDb()
    const now = new Date();
    const wishlist = await db.collection(COLLECTION_WISHLIST).findOne({ $and: [{ userId: new ObjectId(userId) }, { productId: new ObjectId(productId) }] })

    console.log(wishlist, "< === wishlist")
    if (wishlist) {
        return { message: "Item already exist" }
    }

    await db.collection(COLLECTION_WISHLIST).insertOne({ userId: new ObjectId(userId), productId: new ObjectId(productId), createdAt: now, updatedAt: now })

    return { message: "success add to wishlist" }
}

export const deleteWishlist = async (id: string) => {
    const db = await getDb()
    await db.collection(COLLECTION_WISHLIST).deleteOne({ _id: new ObjectId(id) })

    return { message: "success delete..." }
}