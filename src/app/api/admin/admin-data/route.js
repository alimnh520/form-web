import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { dbConnection } from "../../../../../lib/connectDB";
import { ObjectId } from "mongodb";

export const GET = async (request) => {
    const collection = (await dbConnection()).collection('admin');
    try {
        const token = request.cookies.get('token')?.value;
        if (token) {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
            const data = await collection.findOne({ _id: new ObjectId(verifyToken.userId) }, {
                projection: {
                    password: 0
                }
            });
            return NextResponse.json({ message: data, success: true });
        }
    } catch (error) {
        return NextResponse.json({ message: 'not registered', success: false });
    }
}