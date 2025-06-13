import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        const { nidNum, dob } = await request.json();
        const res = await fetch(`https://api.unique-seba.com/servercopy-jov-pdf-pro/sv.php?key=cyber2025&nid=${nidNum}&dob=${dob}`, {
            method: 'GET',
        });
        const data = await res.json();
        return NextResponse.json({ message: data["data-Info"], success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Failed', success: false });
    }
}