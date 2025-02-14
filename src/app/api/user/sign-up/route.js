import { NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/mongodb"

export const POST = async(request) => {
    try {
        await connectDb();
        const data = await request.json();
        const {username, email, mobile} = data.user
        console.log(username, email, mobile);
        return NextResponse.json({message: 'User sign up successfully', success: true});
    } catch (error) {
        return NextResponse.json({message: 'Failed to sign up', success: true});
    }
}