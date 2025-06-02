import { NextResponse } from "next/server"
import { dbConnection } from "../../../../../../lib/connectDB";

export const GET = async (request) => {
    const cookie = await request.cookies;
    const userMail = cookie.get('email')?.value;
    const userMobile = cookie.get('mobile')?.value;
    try {
        const collection = (await dbConnection()).collection('userprofiles');
        const data = await collection.findOne({ email: userMail });
        if (data.status === 'accept') {
            const response = NextResponse.json({ message: 'Success', success: true });
            response.cookies.delete('mobile');
            response.cookies.delete('email');
            return response;
        }

        return NextResponse.json({ message: 'Not accept', success: false });
    } catch (error) {
        return NextResponse.json({ message: 'Failed', success: false });
    }
}