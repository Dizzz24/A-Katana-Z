"use client"

import { useFormStatus } from "react-dom"

export default function LoadingBtn({ value }: { value: string }) {
    const { pending } = useFormStatus()

    return (
        <>
            <button
                type="submit"
                className="w-full py-3 px-4 text-center text-lg font-bold text-white bg-black rounded-full border-2 border-black transition duration-300 hover:text-black hover:border-2 hover:border-black hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {pending ? "Loading..." : value}
            </button>
        </>
    )
}