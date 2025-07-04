import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";
import DCRPayment from "../../../../../../models/DCRPayment";
import Driving from "../../../../../../models/Driving";

export const POST = async (request) => {
    try {

        const { username, email, mobile, nid, fatherNid, motherNid, bill } = await request.json();

        if (!nid || !fatherNid || !motherNid || !bill) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const collection = (await dbConnection()).collection('userprofiles');

        const userData = await collection.findOne({ email });
        if (userData.balance < 2250) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -2250
            }
        });

        await connectDb();

        const newUser = new Driving({
            username,
            email,
            mobile,
            nid,
            fatherNid,
            motherNid,
            bill,
        });

        await newUser.save();

        return NextResponse.json({ message: 'successful', success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'failed', success: false });
    }
}
export const GET = async () => {
    try {
        const collection = (await dbConnection()).collection('drivings');
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}

