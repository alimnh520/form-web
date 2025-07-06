import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import ServerNIDCard from "../../../../../../models/ServerNIDCard";
import { dbConnection } from "../../../../../../lib/connectDB";

export async function POST(request) {
    try {

        const { voterNum, nidNum, dobNum, username, email } = await request.json();

        if (!dobNum || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const collection = (await dbConnection()).collection('userprofiles');

        const userData = await collection.findOne({ email });

        if (!userData.active_balance) {
            return NextResponse.json({ message: '', success: false });
        }

        if (userData.balance < 30) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -30
            }
        });

        await connectDb();

        const saveUser = new ServerNIDCard({
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
