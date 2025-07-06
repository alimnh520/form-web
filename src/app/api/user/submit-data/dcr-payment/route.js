import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";
import DCRPayment from "../../../../../../models/DCRPayment";

export const POST = async (request) => {
    try {

        const { email, mobile, divisionName, abedon, username } = await request.json();

        if (!abedon || !divisionName) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const collection = (await dbConnection()).collection('userprofiles');

        const userData = await collection.findOne({ email });

        if (!userData.active_balance) {
            return NextResponse.json({ message: '', success: false });
        }

        if (userData.balance < 1110) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -1110
            }
        });

        await connectDb();

        const newUser = new DCRPayment({
            username,
            email,
            mobile,
            dcrPayment: abedon,
            divisionName
        });

        await newUser.save();

        return NextResponse.json({ message: 'successful', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed', success: false });
    }
}
export const GET = async () => {
    try {
        const collection = (await dbConnection()).collection('dcrpayments');
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}

