import { MongoClient } from "mongodb";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export const POST = async (request) => {
    const uri = process.env.MONGODB_URI
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('admin');
    try {
        const reqBody = await request.json();
        const data = reqBody.user;
        const username = data.username;
        const password = data.password;
        const userdata = await collection.findOne({username});
        const comparePass = await bcrypt.compare(password, userdata.password);
        console.log(comparePass);

        if (!userdata) {
            return NextResponse.json({message: "User not found", success: false});
        }

        if (!comparePass) {
            return NextResponse.json({message: "Password is wrong", success: false});
        }

        const token = await jwt.sign({userId: userdata._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        const response = NextResponse.json({message: 'Success to login', success: true});
        response.cookies.set('token', token, {
            httpOnly: true,
            source: process.env.NODE_ENV,
            maxAge: 24*60*60*1000,
            path: '/'
        });
        return response

    } catch (error) {
        return NextResponse.json({message: "The error is : ", error});
    }
}