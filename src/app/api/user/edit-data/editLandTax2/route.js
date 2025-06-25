import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { id, type, email } = await request.json();

        if (type === 'accept') {
            const collection = (await dbConnection()).collection('landtax2');
            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'complete'
                }
            });
        }

        if (type === 'cancel') {
            const collection = (await dbConnection()).collection('landtax2');
            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'reject'
                }
            });
            const collectionUser = (await dbConnection()).collection('userprofiles');
            await collectionUser.findOneAndUpdate({ email }, {
                $inc: {
                    balance: 300
                }
            });
        }

        return NextResponse.json({ message: 'successful', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}