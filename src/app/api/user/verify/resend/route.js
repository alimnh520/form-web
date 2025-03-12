import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/utils/sendMail";

export const GET = async () => {
    const cookie = await request.cookies;
    const userMail = cookie.get('email')?.value;
    const userMobile = cookie.get('mobile')?.value;
    try {
        const response = NextResponse.json({ message: 'Otp resend successful', success: true });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn: '2m' });

        if (userMail) {
            await sendEmail({ email:userMail, otp });
        }

        response.cookies.set('otp', hashedOtp, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 60 * 1000,
            path: '/'
        });

        return response;

    } catch (error) {
        return NextResponse.json({ message: 'Failed to resend otp', success: false });
    }
}