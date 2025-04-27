import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../lib/connectDB";
import { ObjectId } from "mongodb";

export const POST = async (request) => {
    try {
        const { id } = await request.json();

        const collection = (await dbConnection()).collection('userprofiles');
        await collection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}