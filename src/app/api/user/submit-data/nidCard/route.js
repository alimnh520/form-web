import { NextResponse } from "next/server";
import NidCard from "../../../../../../models/NidCard";
import { connectDb } from "../../../../../../lib/mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";

export async function POST(request) {
    try {

        const { select, voterNum, nidNum, dobNum, username, email } = await request.json();


        if (!dobNum || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const collection = (await dbConnection()).collection('userprofiles');

        const userData = await collection.findOne({ email });

        if (!userData.active_balance) {
            return NextResponse.json({ message: '', success: false });
        }

        if (userData.balance < 120) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -120
            }
        });

        await connectDb();

        const saveUser = new NidCard({
            username,
            email,
            voternum: !select ? voterNum : '',
            nidnum: select ? nidNum : '',
            dob: dobNum
        });
        await saveUser.save();

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed', success: false });
    }
}

export const GET = async (request) => {
    const cookie = await request.cookies;
    const email = cookie.get('profile')?.value;
    const collection = (await dbConnection()).collection('nidcards');
    const data = await collection.find({ email }).toArray();
    try {
        return NextResponse.json({ message: data });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get data' });
    }
}