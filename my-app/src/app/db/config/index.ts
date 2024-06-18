import { MongoClient } from "mongodb"

const MONGO_URI = (process.env.MONGO_URI) as string

let client: MongoClient

export const getInstanceMongoClient = async () => {
    if (!client) {
        client = new MongoClient(MONGO_URI)
        await client.connect()
    }

    return client
}