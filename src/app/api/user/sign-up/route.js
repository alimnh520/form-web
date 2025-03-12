import { NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/mongodb"
import UserProfile from "../../../../../models/UserProfile";
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/utils/sendMail";
import { dbConnection } from "../../../../../lib/connectDB";

export const POST = async (request) => {
    const collection = (await dbConnection()).collection('userprofiles');
    await connectDb();
    try {
        const data = await request.json();
        const type = data.type;
        const { username, email, mobile } = data.user;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn: '2m' });

        if (type) {
            const user = await collection.findOne({ mobile });

            if (user) {
                if (!user.password || !user.isVerified) {
                    await collection.deleteMany({ mobile });
                }
            }

            if (user) {
                if (user.password && user.isVerified) {
                    return NextResponse.json({ message: 'User already exits', success: false });
                }
            }

            const saveUser = new UserProfile({
                username,
                mobile,
            });
            await saveUser.save();

            const response = NextResponse.json({ message: 'User sign up successfully', success: true });

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

            if (user) {
                if (!user.password || !user.isVerified) {
                    await collection.deleteMany({ email });
                }
            }

            if (user) {
                if (user.password && user.isVerified) {
                    return NextResponse.json({ message: 'User already exits', success: false });
                }
            }

            const saveUser = new UserProfile({
                username,
                email,
            });
            await saveUser.save();
            await sendEmail({ email, otp });

            const response = NextResponse.json({ message: 'User sign up successfully', success: true });

            response.cookies.set('email', email, {
                httpOnly: true,
                source: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: '/'
            });

            response.cookies.set('otp', hashedOtp, {
                httpOnly: true,
                source: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 2 * 60 * 1000,
                path: '/'
            });

            return response
        }

    } catch (error) {
        return NextResponse.json({ message: 'Failed to signup', success: false });
    }
}