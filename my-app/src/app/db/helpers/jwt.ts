import * as jose from "jose"
const { JWT_SECRET } = process.env

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET must be provided!")
}

const SECRET = new TextEncoder().encode(JWT_SECRET)

export interface Payload {
    _id: string;
    iat: number;
}

export const signToken = async (payload: jose.JWTPayload) => {
    const token = new jose.SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().sign(SECRET)

    return token
}

export const verifyToken = async (token: string) => {
    const payloadJose = await jose.jwtVerify(token, SECRET)

    return payloadJose.payload
}