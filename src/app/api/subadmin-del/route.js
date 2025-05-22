import { NextResponse } from "next/server"

import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { userId } = await request.json();
        const collection = (await dbConnection()).collection('subadmins');
        await collection.deleteOne({ _id: new ObjectId(userId) });
        return NextResponse.json({ message: 'data deleted successfully', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed to delete data' });
    }
}