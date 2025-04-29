import { NextResponse } from "next/server"
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ message: 'type any message', success: false });
        }
        const collection = (await dbConnection()).collection('admin-notice');
        await collection.findOneAndUpdate({ _id: new ObjectId('6810d832eb7748681fe275e7') }, {
            $set: {
                message
            }
        });

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Failed', success: false });
    }
}

export const GET = async () => {
    try {
        const collection = (await dbConnection()).collection('admin-notice');
        const data = await collection.find({_id: new ObjectId('6810d832eb7748681fe275e7')}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed', success: false });
    }
}