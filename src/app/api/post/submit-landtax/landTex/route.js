import { connectDb } from "../../../../../../lib/mongodb";
import LandTax from "../../../../../../models/LandTax";

export async function POST(request) {
    try {
        await connectDb();
        const { divisionName, districtName, upazilaName, mouzaName, khatianName, mobile } = await request.json();
        const newUser = new LandTax({
            divisionName,
            districtName,
            upazilaName,
            mouzaName,
            khatianName,
            mobile
        });
        await newUser.save();
        return new Response(
            JSON.stringify({ message: 'User created successfully' }),
            { status: 201 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Sending error', error }),
            { status: 500 }
        );
    }
}
