import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const uri = process.env.MONGODB_URI
        const client = new MongoClient(uri);
        await client.connect();
        const dataBase = client.db('test');
        const collection = dataBase.collection('landforms');
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });

    } catch (error) {
        return NextResponse.json({ message: 'Failed to get data : ', error });
    }
}