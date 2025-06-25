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
        if (userData.balance < 300) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -300
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
