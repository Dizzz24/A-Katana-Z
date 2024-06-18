import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Payload, verifyToken } from "./app/db/helpers/jwt";

export async function middleware(request: NextRequest) {
    try {
        console.log("masuk midleware")
        const cookieAuth = cookies().get("Authorization")

        if (!cookieAuth?.name) throw { message: "Invalid Token" }

        let token = cookieAuth?.value.split(" ")[1]

        const payload = await verifyToken(token)

        if (!payload) throw { message: "Invalid Token" }

        const userId = (payload._id) as string

        const reqHeaders = new Headers(request.headers)

        console.log(payload, "nihh payload on auth broooo")
        reqHeaders.set("x-user-id", userId)

        return NextResponse.next({
            headers: reqHeaders
        })
    } catch (error) {
        console.log(error, "<============== Errors")
        let status = 500
        let message = "Internal server error"

        if (error !== null && typeof error === "object" && error.hasOwnProperty("message")) {
            const errMessage = (error as { message: unknown }).message;
            if (typeof errMessage === "string" && errMessage === "Invalid Token") {
                status = 400;
                message = errMessage;
            }
        }

        return NextResponse.json({
            message
        }, { status })
    }
}

export const config = {
    matcher: "/api/wishlist/:path*"
}