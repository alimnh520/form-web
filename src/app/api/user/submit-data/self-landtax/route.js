import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import SelfLandTax from "../../../../../../models/SelfLandTax";

export async function POST(request) {
    try {
        await connectDb();

        const { divisionName, districtName, upazilaName, mouzaName, khatianName, username, email } = await request.json();

        if (!divisionName || !districtName || !upazilaName || !mouzaName || !khatianName || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

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
        return NextResponse.json({ message: 'false', success: false });
    }
}
