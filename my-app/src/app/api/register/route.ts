import { RegisterInput } from "@/app/db/models/types";
import { getUserByEmailorUname, register } from "@/app/db/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, username, email, password }: RegisterInput = await request.json()

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = regex.test(email);

        if (!isEmail) return NextResponse.json(
            { message: "Invalid Email format" },
            { status: 400 }
        )

        const user = await getUserByEmailorUname(email, username)

        if (user.message !== "aman") return NextResponse.json(
            { message: user.message },
            { status: 400 }
        )

        const input = { name, username, email, password }

        await register(input)

        return NextResponse.json({
            message: "success register"
        }, { status: 201 })
    } catch (error) {
        console.log(error, "Error on endpoin register =============")
        return NextResponse.json(
            { message: "internal server error", },
            { status: 500 }
        )
    }
}