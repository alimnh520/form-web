import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../../../lib/connectDB";

export const GET = async (request) => {
    const collection = (await dbConnection()).collection('mouzamaps');
    const data = await collection.find({}).toArray();
    try {
        return NextResponse.json({ message: data });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get data' });
    }
}