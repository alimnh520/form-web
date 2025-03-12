import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { dbConnection } from "../../../../../lib/connectDB";
import { sendEmail } from "@/utils/sendMail";

export const POST = async (request) => {
    const collection = (await dbConnection()).collection('userprofiles');
    try {
        const data = await request.json();
        const type = data.type;
        const { email, mobile } = data.user;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn: '2m' });

        if (type) {
            const user = await collection.findOne({ mobile });

            if (!user) {
                return NextResponse.json({ message: 'User not registered', success: false });
            }

            const response = NextResponse.json({ message: 'Code sent successfully', success: true });

            response.cookies.set('mobile', mobile, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });

            response.cookies.set('otp', hashedOtp, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 2 * 60 * 1000,
                path: '/'
            });

            return response
        }

        if (!type) {
            const user = await collection.findOne({ email });

            if (!user) {
                return NextResponse.json({ message: 'User not registered', success: false });
            }

            const response = NextResponse.json({ message: 'Code sent successfully', success: true });

            await sendEmail({ email, otp });

            response.cookies.set('email', email, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });

            response.cookies.set('otp', hashedOtp, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 2 * 60 * 1000,
                path: '/'
            });

            return response
        }

    } catch (error) {
        return NextResponse.json({ message: "Failed to forget password" });
    }
}