import { getInstanceMongoClient } from "../config";
import { DATABASE_NAME } from "./constants";

export const getDb = async () => {
    const client = await getInstanceMongoClient()
    const db = client.db(DATABASE_NAME)

    return db
}