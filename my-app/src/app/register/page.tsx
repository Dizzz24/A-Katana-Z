import BaseUrl from '../BaseUrl'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import DisplayError from '@/components/DisplayError'
import LoadingBtn from '@/components/LoadingBtn'
import Link from 'next/link'


export default function Register() {
    const handleRegister = async (formData: FormData) => {
        "use server"
        const name = formData.get("name")
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")

        console.log({ name, username, email, password }, "<< === Input")

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, username, email, password })
        })

        const resJson = await response.json()

        if (!response.ok) {
            const { message } = resJson
            return redirect("/register?error=" + message)
        }

        return redirect("/login")
    }

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#333" }}>
            <div className="w-full mx-auto max-w-lg bg-white rounded-lg shadow-md overflow-hidden p-10">
                <div className="text-center">
                    <img
                        className="mx-auto h-20 w-auto mb-6"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="text-3xl font-bold text-gray-900">Register a new account</h2>
                    <DisplayError />
                </div>
                <form className="flex flex-col mt-8 gap-2" action={handleRegister}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-base font-medium text-gray-700 ml-3"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="appearance-none mt-1 block w-full rounded-full border border-gray-300 bg-white py-3 px-4 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-base font-medium text-gray-700 ml-3"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="appearance-none mt-1 block w-full rounded-full border border-gray-300 bg-white py-3 px-4 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-base font-medium text-gray-700 ml-3"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            className="appearance-none mt-1 block w-full rounded-full border border-gray-300 bg-white py-3 px-4 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="password"
                                className="block text-base font-medium text-gray-700 ml-3"
                            >
                                Password
                            </label>
                            <a href="#" className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="appearance-none mt-1 block w-full rounded-full border border-gray-300 bg-white py-3 px-4 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div className="my-8">
                        <LoadingBtn value={"Register"} />
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account? <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
                </p>
            </div>
        </div >
    )
}
