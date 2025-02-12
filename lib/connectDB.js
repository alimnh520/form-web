import { MongoClient } from "mongodb"

export const dbConnection = async () => {
    const uri = process.env.MONGODB_URI
    const client = new MongoClient(uri);
    await client.connect();
    const dataBase = client.db('test');
    return dataBase
}