import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../lib/connectDB";

export const GET = async (request) => {
    try {
        const cookie = await request.cookies;
        const email = cookie.get('profile')?.value;
        const collection = (await dbConnection()).collection('userprofiles');
        const user = await collection.findOne({ email }, { 
            projection: { 
                password: 0
            } 
        });

        return NextResponse.json({ message: user, success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Please signup or login', success: false });
    }
}