import { MongoClient } from "mongodb";
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export const POST = async (request) => {
    const uri = process.env.MONGODB_URI
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('admin');

    try {
        const reqBody = await request.json();
        const { username, password } = reqBody.user;
        const data = await collection.findOne({ username });

        if (!data) {
            return NextResponse.json({ message: "User not found", success: false });
        }


        if (password !== data.password) {
            return NextResponse.json({ message: "Password is wrong", success: false });
        }

        const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({ message: 'Login successful', success: true });
        response.cookies.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // ⏳ 1 day in seconds
            sameSite: "strict",
            path: '/'
        });
        return response

    } catch (error) {
        return NextResponse.json({ message: "Failed to login" });
    }
}