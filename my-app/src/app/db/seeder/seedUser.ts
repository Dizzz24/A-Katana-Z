import { getDb } from "../models/db"
import { hashPass } from "../helpers/hashPass"
import { COLLECTION_USER } from "../models/constants"

const users = [
    {
        username: "user1",
        email: "user1@mail.com",
        password: "12345"
    },
    {
        username: "user2",
        email: "user2@mail.com",
        password: "12345"
    }
]

export default async function seedUser() {
    try {
        const dataUser = users.map(el => {
            el.password = hashPass(el.password)

            return el
        })

        const db = await getDb()
        await db.collection(COLLECTION_USER).insertMany(dataUser)

        console.log("=========== SUCCESS SEEDING USER ===========")
    } catch (error) {
        console.log("=========== FAILED SEEDING USER ===========", error)
    }
}

