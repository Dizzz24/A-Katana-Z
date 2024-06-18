'use client'

import AnimationText from '@/components/AnimationText'
import { IoSearchOutline } from "react-icons/io5"
import React, { useEffect, useState } from "react"
import { useDebounce } from 'use-debounce'
import InfiniteScroll from "react-infinite-scroll-component"
import { ProductList, ProductModel } from '../../db/models/types'
import BaseUrl from '../../BaseUrl'
import Card from '@/components/Card'

export default function Products() {
    const [products, setProducts] = useState<ProductModel[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)

    const [query, setQuery] = useState({
        page: 1,
        pageSize: 4,
        search: ""
    })

    const [search] = useDebounce(query.search, 1000)

    const fetchData = async () => {
        try {
            setIsLoading(true)


            const q = `${process.env.NEXT_PUBLIC_BASE_URL || BaseUrl}api/products?page=${query.page}&pageSize=${query.pageSize}&search=${search}`

            console.log(q)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || BaseUrl}/api/products?page=${query.page}&pageSize=${query.pageSize}&search=${search}`)

            if (!response.ok) {
                throw new Error("Failed to fetch")
            }

            const dataJson = await response.json()

            console.log(dataJson, "< === nih ")

            setProducts((query.page > 1) ? [...products, ...dataJson.data] : dataJson.data)
            setHasMore(dataJson.totalPage > query.page)
        } catch (error) {
            console.error("Error fetching products", error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchOtherData = () => {
        if (!isLoading && hasMore) {
            setIsLoading(true)
            setQuery({ ...query, page: query.page + 1 })
        }
    }

    useEffect(() => {
        if (search) {
            setQuery({ ...query, page: 1 })
        }
        fetchData()
    }, [search, query.page])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="flex flex-col flex-1 h-[32svh] bg-zinc-100">
                <div className="flex gap-5 justify-center items-center flex-col" style={{ marginTop: 100 }}>
                    <AnimationText text={"ALL PRODUCT"} other={true} />
                    <div className="flex justify-center mb-4 w-96">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-l-lg w-full"
                            value={query.search}
                            onChange={(e) => setQuery({ ...query, search: e.target.value })}
                        />
                        <div className="p-4 bg-emerald-200 rounded-r-lg" onClick={fetchData}>
                            <IoSearchOutline size={20} color='black' />
                        </div>
                    </div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={products.length}
                next={fetchOtherData}
                hasMore={hasMore}
                loader={isLoading && <h1 className='text-center text-2xl'>Loading...</h1>}
                endMessage={
                    products.length >= 1 ? <h1 className='text-center text-2xl'>Thats all data</h1> : <h1 className='text-center text-2xl'>Data not found</h1>
                }
            >
                <div className="flex flex-wrap justify-center gap-3 bg-zinc-100 pb-20">
                    {products.map((product, index) => (
                        <Card key={index} product={product} />
                    ))}
                </div>
            </InfiniteScroll>
        </>
    )
}