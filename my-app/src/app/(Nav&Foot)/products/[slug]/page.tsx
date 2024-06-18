import { Metadata, ResolvingMetadata } from "next"
import BaseUrl from "@/app/BaseUrl"
import { ProductModel } from "@/app/db/models/types"
import WishlistBtn from "@/components/WishlistBtn"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const response = await fetch(`${BaseUrl}/api/products/${params.slug}`)

    const resJson: { data: ProductModel, message: string } = await response.json()

    const product: ProductModel = resJson.data

    return {
        title: product.name
    }
}

const fetchDetail = async (slug: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`)

        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        const resJson: { data: ProductModel, message: string } = await response.json()

        if (resJson.message === "data not found") {
            return resJson.message
        }

        const product = resJson.data

        return product
    } catch (error) {
        console.log(error)
    }
}

export default async function DetailProduct({ params }: { params: { slug: string } }) {
    const product = (await fetchDetail(params.slug)) as ProductModel

    return (
        <>
            <div className="flex flex-col flex-1">
                <div className="h-screen flex justify-center items-center p-10" style={{ marginTop: 10, background: "linear-gradient(to bottom left, #900000, #000000)" }}>
                    <div className="bg-zinc-200 flex rounded-lg" style={{ width: "85%", height: "80%" }}>
                        <div className="flex flex-1 items-center justify-center w-1/2 rounded-l-lg">
                            <img
                                src={product.thumbnail || "https://katana.store/cdn/shop/files/samurai-swords.jpg?v=1689938646&width=800"}
                                alt="Product Image"
                                width={"90%"}
                                className="rounded-lg"
                            />
                            <div className=""></div>
                        </div>
                        <div className="flex-1 w-1/2 rounded-r-lg p-10 flex flex-col gap-5">
                            <h2 className="text-5xl text-black font-bold">{product.name}</h2>
                            <p className="text-red-500">{`${product.price}.00`}</p>
                            <WishlistBtn isBtn={true} productId={product._id} />
                            <div className="w-full flex justify-between">
                                <div className="flex flex-1 justify-center items-center bg-emerald-300 rounded-lg p-6">
                                    <svg role="presentation" fill="none" focusable="false" strokeWidth="1" width="24" height="24" className="icon icon-picto-truck" viewBox="0 0 24 24">
                                        <path d="M19 17.798h1.868a1.714 1.714 0 0 0 1.715-1.715V11.25a3.274 3.274 0 0 0-3.275-3.274H14.395l-.097 7.869" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M8.71 18.175c1.565 0 3.094-.16 4.572-.321m-9.94-.087a1.78 1.78 0 0 1-1.576-1.56c-.189-1.594-.407-3.256-.407-4.96 0-1.705.216-3.366.405-4.96a1.783 1.783 0 0 1 1.577-1.56c1.725-.186 3.523-.409 5.37-.409s3.644.223 5.368.408a1.783 1.783 0 0 1 1.578 1.56c.066.564.136 1.135.199 1.714" stroke="black"></path>
                                        <path d="M16.061 21.069a2.894 2.894 0 1 1 0-5.793 2.894 2.894 0 0 1 0 5.794v-.001ZM5.832 21.069a2.894 2.894 0 1 1 0-5.792 2.894 2.894 0 0 1 0 5.793v-.001Z" fill="currentCollor" fillOpacity=".12" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <h1 className="text-md text-red-800 font-semibold ml-2">Free ongkir!</h1>
                                </div>
                                <div className="flex flex-1 justify-center items-center bg-emerald-200 rounded-lg p-6 ml-4">
                                    <img
                                        src="//katana.store/cdn/shop/files/forge.png?v=1683806139&ampwidth=256"
                                        alt="forge"
                                        srcSet="//katana.store/cdn/shop/files/forge.png?v=1683806139&ampwidth=32 32w, //katana.store/cdn/shop/files/forge.png?v=1683806139&ampwidth=64 64w"
                                        width="256"
                                        height="256"
                                        loading="lazy"
                                        style={{ maxWidth: "32px" }}
                                        sizes="32px"
                                    />

                                    <h1 className="text-md text-black font-semibold ml-2">Hand forged sword</h1>
                                </div>
                            </div>
                            <div className="">
                                <h1 className="text-xl text-black font-bold">Description</h1>
                                <p className="text-black mt-4">{product.description}</p>
                            </div>
                            <h1 className="text-xl text-black font-bold">Images</h1>
                            <div className="flex overflow-x-auto gap-2" style={{ overflowY: "hidden" }}>
                                {!!product.images && product.images.map((linkImg, index) => (
                                    <div key={index} className="h-28 w-28 relative rounded-lg flex-shrink-0">
                                        <img
                                            src={linkImg || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"}
                                            alt={"Pict"}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
