import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { dbConnection } from "../../../../../lib/connectDB";
import { ObjectId } from "mongodb";

export const GET = async (request) => {
    const collection = (await dbConnection()).collection('admin');

    try {
        const token = request.cookies.get('admin-token')?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        const data = await collection.findOne(
            { _id: new ObjectId(verifyToken.userId) },
            { projection: { password: 0 } }
        );

        if (!data) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        return NextResponse.json({ message: data, success: true });

    } catch (error) {
        console.error("Token verification error:", error);

        // ❗ এখানে return না দিলে response হবে না, ভুল হবে।
        const res = NextResponse.json({ message: 'Not registered', success: false }, { status: 401 });
        res.cookies.set('admin-token', '', { maxAge: 0 }); // ✅ Cookie মুছে ফেলা হলো ঠিকভাবে
        return res;
    }
};
