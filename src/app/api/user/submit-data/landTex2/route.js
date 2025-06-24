import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import LandTax2 from "../../../../../../models/LandTax2";

export async function POST(request) {
    try {

        const { divisionName, districtName, upazilaName, mouzaName, khatianName, mobile, nidNum, dobNum, username, email } = await request.json();

        if (!divisionName || !districtName || !upazilaName || !mouzaName || !khatianName || !mobile || !nidNum || !dobNum || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

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
