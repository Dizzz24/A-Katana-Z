import { getUserByEmail } from "@/app/db/models/user";
import { verifyPass } from "@/app/db/helpers/hashPass";
import { signToken } from "@/app/db/helpers/jwt";
import { NextResponse } from "next/server";
import { LoginInput } from "@/app/db/models/types";

export async function POST(request: Request) {
    try {
        const body: LoginInput = await request.json()

        if (!body.email.trim() || !body.password.trim()) return NextResponse.json(
            { message: "Email or password is required" },
            { status: 400 }
        )

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = regex.test(body.email);

        if (!isEmail) return NextResponse.json(
            { message: "Invalid Email format" },
            { status: 400 }
        )

        const user = await getUserByEmail(body.email)

        console.log(user, "Userrr ====")

        if (!user) return NextResponse.json(
            { message: "Invalid Email or Password" },
            { status: 401 }
        )

        const validPassword = verifyPass(body.password, user.password)

        if (!validPassword) return NextResponse.json(
            { message: "Invalid Email or Password" },
            { status: 401 }
        )

        const access_token = await signToken({ _id: user._id })

        const response = NextResponse.json({
            message: "success login",
            data: {
                access_token
            }
        })

        response.cookies.set("Authorization", `Bearer ${access_token}`)

        return response
    } catch (error) {
        console.log(error, "Error on endpoin Login =============")
        return NextResponse.json(
            { message: "Internal Server Error", },
            { status: 500 }
        )
    }
}