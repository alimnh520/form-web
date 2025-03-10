import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export const GET = async () => {
    try {
        const response = NextResponse.json({ message: 'Otp resend successful', success: true });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otp);
        const hashedOtp = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn: '2m' });

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