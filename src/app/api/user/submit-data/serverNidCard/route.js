import { NextResponse } from "next/server";
import NidCard from "../../../../../../models/NidCard";
import { connectDb } from "../../../../../../lib/mongodb";

export async function POST(request) {
    try {
        await connectDb();

        const { voterNum, nidNum, dobNum, username, email } = await request.json();

        if (!dobNum || !username || !email) {
            return NextResponse.json({ message: 'Fill up all', success: false });
        }
        console.log(voterNum, nidNum, dobNum, username, email)
        const saveUser = new NidCard({
            username,
            email,
            voternum: voterNum,
            nidnum: nidNum,
            dob: dobNum
        });
        await saveUser.save();

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed', success: false });
    }
}
