import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import LandTax from "../../../../../../models/LandTax";

export async function POST(request) {
    try {
        await connectDb();
        const { divisionName, districtName, upazilaName, mouzaName, khatianName, mobile, username, email } = await request.json();

        if (!divisionName || !districtName || !upazilaName || !mouzaName || !khatianName || !mobile || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const newUser = new LandTax({
            username,
            email,
            divisionName,
            districtName,
            upazilaName,
            mouzaName,
            khatianName,
            mobile
        })
        await newUser.save();
        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed', success: false });
    }
}
