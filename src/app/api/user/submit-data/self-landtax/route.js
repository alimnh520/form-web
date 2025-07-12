import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import SelfLandTax from "../../../../../../models/SelfLandTax";
import { dbConnection } from "../../../../../../lib/connectDB";

export async function POST(request) {
    try {

        const { divisionName, districtName, upazilaName, mouzaName, khatianName, username, email } = await request.json();

        if (!divisionName || !districtName || !upazilaName || !mouzaName || !khatianName || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const collection = (await dbConnection()).collection('userprofiles');

        const userData = await collection.findOne({ email });

        if (!userData.active_balance) {
            return NextResponse.json({ message: '', success: false });
        }

        if (userData.balance < 580) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -580
            }
        });

        await connectDb();

        const newUser = new SelfLandTax({
            username,
            email,
            divisionName,
            districtName,
            upazilaName,
            mouzaName,
            khatianName,
        });
        await newUser.save();

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed', success: false });
    }
}

export const GET = async (request) => {
    const cookie = await request.cookies;
    const email = cookie.get('profile')?.value;
    const collection = (await dbConnection()).collection('selflandtaxes');
    const data = await collection.find({ email }).toArray();
    try {
        return NextResponse.json({ message: data });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get data' });
    }
}