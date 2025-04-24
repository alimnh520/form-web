import { NextResponse } from "next/server"
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { userId } = await request.json();
        const collection = (await dbConnection()).collection('userlogins');
        await collection.deleteOne({ _id: new ObjectId(userId) });
        return NextResponse.json({ message: 'সফল হয়েছে!', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed' });
    }
}