import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';
import { dbConnection } from "../../../../../lib/connectDB";

export const POST = async (request) => {
    const collection = (await dbConnection()).collection('userprofiles');
    try {
        const data = await request.json();
        const type = data.type;
        const { username, email, mobile } = data.user;

        if (type) {
            const user = await collection.findOne({ mobile });

            // check user
            if (!user) {
                return NextResponse.json({ message: 'User not register', success: false });
            }

            // check verify 
            if (!user.isVerified) {
                const response = NextResponse.json({ message: 'Please registered account', success: false });
                await collection.deleteOne({ mobile });
                return response
            }

            // password include ?
            if (!user.password) {
                const response = NextResponse.json({ message: 'Please registered account', success: false });
                // await collection.deleteOne({ email });
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
                const response = NextResponse.json({ message: 'Please registered account', success: false });
                await collection.deleteOne({ email });
                return response
            }

            // password include ?
            if (!user.password) {
                const response = NextResponse.json({ message: 'Please registered account', success: false });
                await collection.deleteOne({ email });
                return response
            }

            // check pass
            const checkPass = await bcrypt.compare(username, user.password);
            if (!checkPass) {
                return NextResponse.json({ message: 'Invalid password', success: false });
            }

            if (user.status === 'pending') {
                return NextResponse.json({ message: 'Waiting for approve', success: false });
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

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to login', success: false });
    }
}