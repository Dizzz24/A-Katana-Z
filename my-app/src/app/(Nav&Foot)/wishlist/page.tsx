'use client'

import AnimationText from '@/components/AnimationText'
import { IoSearchOutline } from "react-icons/io5"
import React, { useEffect, useState } from "react"
import { useDebounce } from 'use-debounce'
import { ProductList } from '../../db/models/types'
import BaseUrl from '../../BaseUrl'
import CardWishlist from '@/components/CardWishlist'

export default function Wishlists() {
    const [wishlists, setWishlists] = useState<[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchData = async (): Promise<void> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`)

        const resJson = await response.json()

        if (!response.ok) {
            throw new Error("Failed to fetch data")
        }

        setWishlists(resJson.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="flex flex-col flex-1 bg-zinc-100">
                <div className="flex justify-center items-center flex-col " style={{ marginTop: 100 }}>
                    <AnimationText text={"MY WISHLIST"} other={true} />
                    <div className="flex flex-wrap mt-5 justify-center gap-3 bg-zinc-100 pb-20">
                        {!wishlists.length ? <h1 className='text-center text-6xl text-black font-bold h-[70svh]'>{"You don't have a wishlist"}</h1> : wishlists.map((wishlist, index) => (
                            <CardWishlist key={index} wishlist={wishlist} fetchData={fetchData} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}