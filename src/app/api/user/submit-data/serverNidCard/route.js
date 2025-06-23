import { NextResponse } from "next/server";
import { connectDb } from "../../../../../../lib/mongodb";
import ServerNIDCard from "../../../../../../models/ServerNIDCard";
import { dbConnection } from "../../../../../../lib/connectDB";

export async function POST(request) {
    try {
        await connectDb();

        const { voterNum, nidNum, dobNum, username, email } = await request.json();

        if (!dobNum || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }

        const saveUser = new ServerNIDCard({
            username,
            email,
            voternum: voterNum,
            nidnum: nidNum,
            dob: dobNum
        });
        await saveUser.save();

        const collection = (await dbConnection()).collection('userprofiles');
        await collection.findOneAndUpdate({ email }, {
            $inc: {
                balance: -15
            }
        });

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed', success: false });
    }
}
