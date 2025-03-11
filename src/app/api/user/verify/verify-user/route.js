import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken';
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {
    const cookie = await request.cookies;
    const otpCode = cookie.get('otp')?.value;
    const userMail = cookie.get('email')?.value;
    const userMobile = cookie.get('mobile')?.value;
    const collection = (await dbConnection()).collection('userprofiles');

    try {
        const { verifyOtp } = await request.json();

        if (!verifyOtp || verifyOtp.length < 6) {
            return NextResponse.json({ message: 'please Enter a otp', success: false });
        }

        if (otpCode) {

            const { otp } = jwt.verify(otpCode, process.env.JWT_SECRET);

            if (verifyOtp !== otp) {
                return NextResponse.json({ message: 'invalid otp', success: false });
            }

            if (verifyOtp === otp) {
                if (userMail) {
                    await collection.findOneAndUpdate({ email: userMail }, {
                        $set: {
                            isVerified: true
                        }
                    });
                }

                if (userMobile) {
                    await collection.findOneAndUpdate({ mobile: userMobile }, {
                        $set: {
                            isVerified: true
                        }
                    });
                }

                const response = NextResponse.json({ message: 'verify successful', success: true });

                response.cookies.set('password', 'true', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: 'strict',
                    path: '/'
                });

                response.cookies.delete('otp');

                return response;
            }
        }
    } catch (error) {
        return NextResponse.json({ message: 'আবার OTP পাঠান', success: false });
    }
}