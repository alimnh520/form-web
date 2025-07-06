import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import LandTax3 from "../../../../../../models/LandTax3";
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {

    try {
        const { email, username, mobile, khatianNumber, mouzaName, upazilaName, districtName, divisionName, dakhila_url, dakhila_id, photo_url, photo_id, dolil_url, dolil_id, khatian_url, khatian_id, } = await request.json();

        const collection = (await dbConnection()).collection('userprofiles');

        const userData = await collection.findOne({ email });

        if (!userData.active_balance) {
            return NextResponse.json({ message: '', success: false });
        }

        if (userData.balance < 370) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -370
            }
        });

        await connectDb();

        const addDetails = new LandTax3({
            username,
            email,
            divisionName,
            districtName,
            upazilaName,
            mouzaName,
            khatianName: khatianNumber,
            mobile,
            khatian_url,
            khatian_id,
            dolil_url,
            dolil_id,
            photo_url,
            photo_id,
            dakhila_url,
            dakhila_id,
        });
        await addDetails.save();

        return NextResponse.json({ message: "uploaded successfully", success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "upload failed", success: false });
    }
}