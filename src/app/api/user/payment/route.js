import { NextResponse } from "next/server"
import UserBalance from "../../../../../models/UserBalance";
import { connectDb } from "../../../../../lib/mongodb";
import { dbConnection } from "../../../../../lib/connectDB";

export const POST = async (request) => {
    await connectDb();
    try {
        const { email, username, amount, trxnum } = await request.json();

        if (!amount || !trxnum || amount < 100) {
            return NextResponse.json({ message: 'Type error', success: false });
        }

        const collection = (await dbConnection()).collection('userbalances');
        const userTrx = await collection.findOne({ trx_num: trxnum });

        if (userTrx?.trx_num === trxnum) {
            return NextResponse.json({ message: 'ট্রানজেকশন ব্যবহৃত হয়েছে!', success: false });
        }

        const addAmount = new UserBalance({
            email,
            username,
            pending_balance: amount,
            trx_num: trxnum,
        });
        await addAmount.save();

        return NextResponse.json({ message: 'সফল হয়েছে!', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed', success: false });
    }
}

export const GET = async () => {
    try {
        const collection = (await dbConnection()).collection('userbalances');
        const userData = await collection.find({}).toArray();
        return NextResponse.json({ message: userData, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed', success: false });
    }
}