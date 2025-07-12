import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";
import MouzaMap from "../../../../../../models/MouzaMap";

export async function POST(request) {
    try {

        const { divisionName, districtName, upazilaName, mouzaName, sitNumber, username, email } = await request.json();

        if (!divisionName || !districtName || !upazilaName || !mouzaName || !sitNumber || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const collection = (await dbConnection()).collection('userprofiles');

        const userData = await collection.findOne({ email });

        if (!userData.active_balance) {
            return NextResponse.json({ message: '', success: false });
        }

        if (userData.balance < 100) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -100
            }
        });

        await connectDb();

        const newUser = new MouzaMap({
            username,
            email,
            divisionName,
            districtName,
            upazilaName,
            mouzaName,
            sitNumber,
        });
        await newUser.save();

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'false', success: false });
    }
}

export const GET = async (request) => {
    const cookie = await request.cookies;
    const email = cookie.get('profile')?.value;
    const collection = (await dbConnection()).collection('mouzamaps');
    const data = await collection.find({ email }).toArray();
    try {
        return NextResponse.json({ message: data });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to get data' });
    }
}