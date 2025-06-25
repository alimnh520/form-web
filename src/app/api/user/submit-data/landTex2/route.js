import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import LandTax2 from "../../../../../../models/LandTax2";
import { dbConnection } from "../../../../../../lib/connectDB";

export async function POST(request) {
    try {

        const { divisionName, districtName, upazilaName, mouzaName, khatianName, mobile, nidNum, dobNum, username, email } = await request.json();

        if (!divisionName || !districtName || !upazilaName || !mouzaName || !khatianName || !mobile || !nidNum || !dobNum || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const collection = (await dbConnection()).collection('userprofiles');

        const userData = await collection.findOne({ email });
        if (userData.balance < 300) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -300
            }
        });

        await connectDb();

        const newUser = new LandTax2({
            username,
            email,
            divisionName,
            districtName,
            upazilaName,
            mouzaName,
            khatianName,
            mobile,
            nidNum,
            dobNum
        });
        await newUser.save();

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'false', success: false });
    }
}
