import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/mongodb";
import SubAdmin from "../../../../models/SubAdmin";
import { dbConnection } from "../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { username, email, password, workList } = await request.json();

        const collection = (await dbConnection()).collection('admin');
        const userName = await collection.findOne({ username });
        const userMail = await collection.findOne({ email });

        if (userName || userMail) {
            return NextResponse.json({ message: 'User already exits', success: false });
        }

        await connectDb();

        await collection.insertOne({
            username,
            email,
            password,
            workList
        });

        return NextResponse.json({ message: 'Success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed', success: false });
    }
}

export const GET = async () => {
    const collection = (await dbConnection()).collection('admin');
    const data = await collection.find({}).toArray();
    try {
        return NextResponse.json({ message: data });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get data' });
    }
}