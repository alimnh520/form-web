import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        const { nidNum, dob } = await request.json();
        const res = await fetch(`${process.env.NIDAPI}/?key=01850685033&nid=${nidNum}&dob=${dob}`, {
            method: 'GET',
        });
        const data = await res.json();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Failed', success: false });
    }
}