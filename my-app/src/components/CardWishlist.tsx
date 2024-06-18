"use client"
import { DetailWishlist } from "@/app/db/models/types"
import WishlistBtn from "./WishlistBtn"
import { MdClose } from "react-icons/md";
import BaseUrl from "@/app/BaseUrl";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Swal from "sweetalert2";

export default function CardWishlist({ wishlist, fetchData }: { wishlist: DetailWishlist; fetchData: () => Promise<void> }) {

    const handleDelete = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${wishlist._id}`, {
            method: "DELETE"
        })

        Swal.fire("Success Delete", "", "success")

        await fetchData()
    }

    return (
        <div className="card card-side w-[80%] h-60 bg-base-100 shadow-xl">
            <img src={wishlist.Product.thumbnail || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"} className="rounded-l-lg" alt="Movie" />
            <div className="card-body flex">
                <div className="flex justify-between">
                    <div className="">
                        <h2 className="card-title">{wishlist.Product.name}</h2>
                        <p>{wishlist.Product.description}</p>
                    </div>
                    <div className="card-actions">
                        <MdClose className="cursor-pointer" color="white" size={24} onClick={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    )
}