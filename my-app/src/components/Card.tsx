"use client "
import Link from 'next/link'
import { ProductModel } from "@/app/db/models/types"
import WishlistBtn from "./WishlistBtn"


export default function Card({ product }: { product: ProductModel }) {
    return (
        <Link href={"/products/" + product.slug} className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={product.thumbnail} alt="Preview katana" /></figure>
            <div className="card-body flex flex-row justify-center items-center" style={{ height: "auto" }}>
                <div className="flex-1">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.price}</p>
                </div>
                <WishlistBtn productId={product._id} />
            </div>
        </Link>
    )
}