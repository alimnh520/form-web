import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { id, type, balance, email } = await request.json();

        if (type === 'accept') {
            const collection = (await dbConnection()).collection('userprofiles');
            const collectionBalance = (await dbConnection()).collection('userbalances');

            await collectionBalance.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'complete',
                }
            });
            await collection.findOneAndUpdate({ email }, {
                $inc: {
                    balance: balance
                },
                $set: {
                    active_balance: true,
                }
            });

            return NextResponse.json({ message: 'সফল হয়েছে!', success: true });
        }

        if (type === 'cancel') {
            const collection = (await dbConnection()).collection('userbalances');
            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'reject'
                }
            });
            return NextResponse.json({ message: 'সফল হয়েছে!', success: true });
        }

        return NextResponse.json({ message: 'সফল হয়েছে!', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Please signup or login', success: false });
    }
}