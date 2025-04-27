import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import DCRPayment from "../../../../../../models/DCRPayment";
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        await connectDb();
        const { email, mobile, divisionName, abedon, username } = await request.json();

        if (!abedon || !divisionName) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const newUser = new DCRPayment({
            username,
            email,
            mobile,
            dcrPayment: abedon,
            divisionName
        });

        await newUser.save();

        return NextResponse.json({ message: 'successful', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed', success: false });
    }
}
export const GET = async () => {
    try {
        const collection = (await dbConnection()).collection('dcrpayents');
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}

