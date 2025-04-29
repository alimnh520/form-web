import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../../lib/connectDB";

export const GET = async (request) => {
    try {
         const db = await dbConnection();
        const collection = db.collection('landforms');
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });

    } catch (error) {
        return NextResponse.json({ message: 'Failed to get data : ', error });
    }
}