import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";

export const GET = async () => {
    try {
        const collection = (await dbConnection()).collection('userprofiles');
        const user = await collection.find({}, {
            projection: {
                password: 0
            }
        }).toArray();
        return NextResponse.json({ message: user, success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Please signup or login', success: false });
    }
}


export const POST = async (request) => {
    try {
        const { id, type } = await request.json();
        if (type === 'accept') {
            const collection = (await dbConnection()).collection('userprofiles');
            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'accept'
                }
            });
        }
        if (type === 'cancel') {
            const collection = (await dbConnection()).collection('userprofiles');
            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'reject'
                }
            });
        }
        return NextResponse.json({ message: 'successful', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}