import { NextResponse } from "next/server";
import NidCard from "../../../../../../models/NidCard";
import { connectDb } from "../../../../../../lib/mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";

export async function POST(request) {
    try {

        const { voterNum, nidNum, dobNum, username, email } = await request.json();

        if (!dobNum || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const collection = (await dbConnection()).collection('userprofiles');

        const userData = await collection.findOne({ email });
        if (userData.balance < 15) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -15
            }
        });

        await connectDb();

        const saveUser = new NidCard({
            username,
            email,
            voternum: voterNum,
            nidnum: nidNum,
            dob: dobNum
        });
        await saveUser.save();

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed', success: false });
    }
}
