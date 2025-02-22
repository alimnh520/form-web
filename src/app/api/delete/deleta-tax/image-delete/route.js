import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        const {imageId} = await request.json();
        return NextResponse.json({message: 'success'});
    } catch (error) {
        return NextResponse.json({message: 'Failed'});
    }
}