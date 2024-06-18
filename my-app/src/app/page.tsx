import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AnimationText from "@/components/AnimationText"
// import Image from "next/image";
import Link from "next/link";
// import BaseUrl from "./BaseUrl";
import { ProductModel } from "./db/models/types";

async function fetchData(): Promise<ProductModel[]> {

  console.log('====================================');


  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?pageSize=10&page=1`);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const dataJson = await response.json();

  return dataJson.data

}

export default async function Home() {
  const products = await fetchData()

  return (
    <>
      <Navbar />
      <div className="flex flex-col flex-1">
        <div className="h-screen flex justify-center items-center bg-slate-900" style={{ marginTop: 10 }}>
          <div className="rounded-lg relative" style={{
            width: "85%", height: "80%", backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/607/350/335/samurai-japanese-minimalism-painting-ai-art-hd-wallpaper-preview.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"
          }}>
            {/* <h1 className="text-9xl absolute bottom-4 left-4 text-yellow-400 font-extrabold">Heyy ybrooooooooo</h1> */}
          </div>
        </div>
        <div className="h-screen flex">
          <div className="relative h-screen lg:w-1/2 p-8 flex flex-col justify-center items-center bg-black border-r-2 border-y-4" style={{ backdropFilter: "blur(10px)" }}>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <h2 className="text-6xl lg:text-4xl font-bold mb-4 text-white">E KATANA-Z</h2>
              <p className="text-lg lg:text-xl mb-4 text-center text-white">
                This is the right place for those of you who are looking for a katana sword with upgraded quality, but still has its main aesthetic or artistic value. on site by forgers with experience of more than 10 years
              </p>
              <Link href={"/products"} className="bg-zinc-100 text-black font-bold px-4 py-2 rounded-lg">
                Shop workspace
              </Link>
            </div>
          </div>

          <div className="flex flex-col w-1/2 p-10 gap-8 bg-black border-l-2 border-y-4">
            <div className="h-1/2">
              <div className="h-full w-full mb-6 flex p-5 gap-5">
                <Link href={"/products"} className="relative flex-1 rounded-lg" style={{ backgroundImage: "url(https://katana.store/cdn/shop/files/samurai-swords.jpg?v=1689938646&width=800)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                  <p className="absolute bottom-4 left-3 text-white text-xl font-bold">All Katana</p>
                </Link>
                <div className="flex-1 flex flex-col gap-5">
                  <div className="h-1/2 flex gap-5">
                    <Link href={"/products"} className="relative flex-1 rounded-lg" style={{ backgroundImage: "url(https://i.pinimg.com/736x/63/89/65/638965c51846a4e4c747ef54c7f0df47.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                      <p className="absolute bottom-4 left-3 text-white text-xl font-bold">Anime Katana</p>
                    </Link>
                    <Link href={"/products"} className="relative flex-1 rounded-lg" style={{ backgroundImage: "url(https://katana.store/cdn/shop/files/wooden-katana-swords.jpg?v=1683807378&width=400)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                      <p className="absolute bottom-4 left-3 text-white text-xl font-bold">Wooden Katana</p>
                    </Link>
                  </div>
                  <Link href={"/products"} className="h-1/2 relative rounded-lg" style={{ backgroundImage: "url(https://katana.store/cdn/shop/files/custom-katanas_147e9a85-a52e-4601-823f-0f3effb221f7.jpg?v=1689921841&width=800)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                    <p className="absolute bottom-4 left-3 text-white text-xl font-bold">Custom Katana</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="h-1/2 flex flex-col">
              <div className="flex justify-between items-center mb-6 ">
                <h1 className="text-3xl font-medium text-white">Katanas</h1>
                <Link href={"/products"} className="text-xl hover:text-white">{"See all products >"}</Link>
              </div>
              <div className="flex overflow-x-auto gap-4" style={{ overflowY: "hidden" }}>
                {products.map((product: ProductModel, index: number) => (
                  <Link href={"/products/" + product.slug} key={index} className="h-80 w-64 relative rounded-lg flex-shrink-0">
                    <img
                      src={product.thumbnail || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"}
                      alt="Shoes"
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-lg bg-black bg-opacity-50 text-white">
                      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                      <p className="text-sm">{product.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div >
      <div className="bg-slate-900 min-h-screen flex justify-center items-center px-10 md:px-20">
        <div className="bg-slate-900 h-3/6 flex flex-col justify-center items-center gap-10 text-center">
          <div className="">
            <AnimationText text={"THE MOST POWERFULL KATANA"} other={false} />
          </div>
          <div className="">
            <h2 className="text-xl md:text-4xl text-white font-bold mb-5">HAND-FORGED BLADES</h2>
            <p className="text-lg md:text-xl text-white max-w-prose">
              Our katanas are handmade in the respect of Japanese traditions. The blade is forged in Tamahagan steel, and sharpened by the best craftsmen with the traditional know-how and techniques. From the handle (tsuka 柄), to the scabbard (saya 鞘), each katana is unique.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}