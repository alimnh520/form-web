import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbConnection } from "../../../../../lib/connectDB";

export const POST = async (request) => {
    const collection = (await dbConnection()).collection('userprofiles');
    try {
        const data = await request.json();
        const type = data.type;
        const { username, email, mobile } = data.user;
        console.log('Your password is : ', username);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otp);
        const hashedOtp = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn: '2m' });

        if (type) {
            const user = await collection.findOne({ mobile });

            // check user
            if (!user) {
                return NextResponse.json({ message: 'User not register', success: false });
            }

            // check verify 
            if (!user.isVerified) {
                const response = NextResponse.json({ message: 'Not verified', success: 'verify' });
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

            // check pass
            const checkPass = await bcrypt.compare(username, user.password);

            console.log(checkPass);
            if (!checkPass) {
                return NextResponse.json({ message: 'Invalid password', success: false });
            }

            // success password
            if (checkPass) {
                const response = NextResponse.json({ message: 'Login successful', success: true });
                response.cookies.set('profile', mobile, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60
                });
                return response
            }
        }

        if (!type) {
            const user = await collection.findOne({ email });

            // check user
            if (!user) {
                return NextResponse.json({ message: 'User not register', success: false });
            }

            // check verify
            if (!user.isVerified) {
                const response = NextResponse.json({ message: 'Not verified', success: 'verify' });
                response.cookies.set('email', email, {
                    httpOnly: true,
                    source: process.env.NODE_ENV === "production",
                    sameSite: "strict",
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

            // check pass
            const checkPass = await bcrypt.compare(username, user.password);
            
            if (!checkPass) {
                return NextResponse.json({ message: 'Invalid password', success: false });
            }


            // success password
            if (checkPass) {
                const response = NextResponse.json({ message: 'Login successful', success: true });
                response.cookies.set('profile', email, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60
                });
                return response
            }
        }
    } catch (error) {
        return NextResponse.json({ message: 'Failed to login', success: false });
    }
}