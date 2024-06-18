import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Navbar() {
    const token = cookies().get("Authorization")

    const handleLogout = async () => {
        "use server"

        cookies().delete("Authorization")

        return redirect("/login")
    }
    return (
        <div className="navbar bg-base-200 fixed z-10 px-5 py-4">
            <div className="flex-1 flex gap-6">
                <div className="flex items-center">
                    <a className="text-white text-2xl">E KATANA-Z</a>
                </div>
                <div className="flex gap-4">
                    <Link href="/" className="text-white text-xl">Home</Link>
                    <Link href="/products" className="text-white text-xl">All Product</Link>
                    <Link href="/wishlist" className="text-white text-xl">Wishlist</Link>
                </div>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div className="flex-1">
                        <>
                            {token ? (<form action={handleLogout}>
                                <button className="btn btn-error text-white text-xl">Logout</button>
                            </form>) :
                                (<Link href={"/login"} className="btn btn-primary text-white text-xl">Login</Link>)}
                        </>
                    </div>
                </div>
            </div>
        </div>)
}