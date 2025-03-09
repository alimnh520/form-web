import { NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/mongodb"

export const POST = async (request) => {
    try {
        await connectDb();
        const data = await request.json();
        const type = data.type;
        const { username, email, mobile } = data.user

        if (type) {
            // type true = mobile
        }
        if (!type) {
            // type false = email
        }

        return NextResponse.json({ message: 'User sign up successfully', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to sign up', success: true });
    }
}