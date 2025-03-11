import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';
import { dbConnection } from "../../../../../lib/connectDB";

export const POST = async (request) => {
    const cookie = await request.cookies;
    const userMail = cookie.get('email')?.value;
    const userMobile = cookie.get('mobile')?.value;
    const collection = (await dbConnection()).collection('userprofiles');
    try {
        const { password } = await request.json();
        const genSalt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, genSalt);

        if (userMail) {
            await collection.findOneAndUpdate({ email: userMail }, {
                $set: {
                    password: hashedPass
                }
            });
        }

        if (userMobile) {
            await collection.findOneAndUpdate({ mobile: userMobile }, {
                $set: {
                    password: hashedPass
                }
            });
        }

        const response = NextResponse.json({ message: 'Password set successfully', success: true });
        
        response.cookies.set('profile', userMobile ? userMobile : userMail, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60
        });
        
        userMobile && response.cookies.delete('mobile');
        userMail && response.cookies.delete('email');
        response.cookies.delete('password');
        return response;

    } catch (error) {
        return NextResponse.json({ message: 'Failed to set Password', success: false });
    }
}