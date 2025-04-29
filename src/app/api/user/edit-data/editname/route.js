import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { email, newName } = await request.json();
        if (!newName || ! email) {
            return NextResponse.json({ message: 'select a name', success: false });
        }
        const collection = (await dbConnection()).collection('userprofiles');
        await collection.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}