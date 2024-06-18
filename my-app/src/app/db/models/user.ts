import { COLLECTION_USER } from "./constants"
import { getDb } from "./db"
import { RegisterInput, UserModel } from "./types"
import { hashPass } from "../helpers/hashPass"
import { ObjectId } from "mongodb"

export const getUserByEmail = async (email: string) => {
    const db = await getDb()

    const user = (await db.collection(COLLECTION_USER).findOne({ email })) as UserModel

    return user
}

export const getUserById = async (id: string) => {
    const db = await getDb()
    const userId = new ObjectId(id)

    const user = (await db.collection(COLLECTION_USER).findOne({ _id: userId }, { projection: { password: 0 } })) as UserModel

    return user
}

export const getUserByEmailorUname = async (email: string, username: string) => {
    const db = await getDb()

    const checkUser = await db.collection(COLLECTION_USER).findOne({ $or: [{ email }, { username }] });

    let message = "aman"

    if (checkUser) {
        if (checkUser.email === email) {
            message = 'Email must be unique'
        } else {
            message = 'Username must be unique'
        }
    }

    return { message }
}

export const register = async (input: RegisterInput) => {
    const db = await getDb()

    const modifierUser = {
        ...input,
        password: hashPass(input.password)
    }

    await db.collection(COLLECTION_USER).insertOne(modifierUser)
}