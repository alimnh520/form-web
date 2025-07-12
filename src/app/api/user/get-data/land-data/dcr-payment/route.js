import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../../../lib/connectDB";

export const GET = async () => {
    try {
        const collection = (await dbConnection()).collection('dcrpayments');
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}

