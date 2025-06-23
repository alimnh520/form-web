import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import LandTax3 from "../../../../../../models/LandTax3";
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {
    await connectDb();
    try {
        const { email, username, mobile, khatianNumber, mouzaName, upazilaName, districtName, divisionName, dakhila_url, dakhila_id, photo_url, photo_id, dolil_url, dolil_id, khatian_url, khatian_id, } = await request.json();

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
        const collection = (await dbConnection()).collection('userprofiles');
        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -370
            }
        });

        return NextResponse.json({ message: "uploaded successfully", success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "upload failed", success: false });
    }
}