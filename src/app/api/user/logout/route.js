import { NextResponse } from "next/server"
import { dbConnection } from "../../../../../lib/connectDB";

export const POST = async (request) => {
    const collection = (await dbConnection()).collection('userprofiles');
    try {
        const { email } = await request.json();
        if (email) {
            await collection.findOneAndUpdate({ email }, {
                $set: {
                    isLogged: false,
                    loggedExpire: null
                }
            });

            const response = NextResponse.json({ message: 'Logout successful', success: true });
            response.cookies.delete('profile');
            return response
        }
        return NextResponse.json({ message: 'Try again', success: false });
    } catch (error) {
        return NextResponse.json({ message: 'Failed', success: false });
    }
}