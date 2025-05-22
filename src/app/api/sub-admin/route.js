import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/mongodb";
import SubAdmin from "../../../../models/SubAdmin";
import { dbConnection } from "../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { username, email, password, workList } = await request.json();

        const collection = (await dbConnection()).collection('subadmins');
        const user = await collection.findOne({ email });

        if (user) {
            return NextResponse.json({ message: 'Email already exits', success: false });
        }

        await connectDb();

        const saveUser = new SubAdmin({
            username,
            email,
            password,
            workList
        });
        await saveUser.save();

        return NextResponse.json({ message: 'Success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed', success: false });
    }
}

export const GET = async () => {
    const collection = (await dbConnection()).collection('subadmins');
    const data = await collection.find({}).toArray();
    try {
        return NextResponse.json({ message: data });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get data' });
    }
}