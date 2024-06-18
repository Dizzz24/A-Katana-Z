"use client"
import BaseUrl from "@/app/BaseUrl";
import { ObjectId } from "mongodb";
import { BsFillBookmarkStarFill } from "react-icons/bs"
import Swal from "sweetalert2";

export default function WishlistBtn({ isBtn, productId }: { isBtn?: boolean, productId: ObjectId }) {
    const handleAdd = async () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        console.log(productId, "<< Product id ")

        Toast.fire({
            icon: "info",
            title: "Loading..."
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${productId}`, {
            method: "POST"
        })

        const resJson = await response.json()

        if (!response.ok) {
            console.log("error brooo")
            Swal.fire("Failed add", "", "error")
            return
        }

        const title = resJson.message

        Toast.fire({
            icon: (title === "Item already exist") ? "warning" : "success",
            title
        });
    }

    return (
        isBtn ? (
            <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold" onClick={handleAdd}>Add to Wishlist</button>
        ) : (
            <div className="card-actions ml-auto h-8 w-8">
                <BsFillBookmarkStarFill size={"full"} onClick={handleAdd} />
            </div>
        )
    );
}