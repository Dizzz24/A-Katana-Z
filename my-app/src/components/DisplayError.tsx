"use client"
import { Suspense } from "react";
import { useSearchParams } from "next/navigation"

export default function DisplayError() {
    const errorMessage = useSearchParams().get("error")

    return (
        <Suspense>
            {errorMessage && (
                <h2 className="rounded bg-black px-4 py-2 text-center font-semi-bold text-white mt-6">{errorMessage}!!</h2>
            )}
        </Suspense>
    )
}