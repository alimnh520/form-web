import { NextResponse } from "next/server"
import { dbConnection } from "../../../../../../lib/connectDB";

export const GET = async() => {
    try {
            const collection = (await dbConnectiontion()).collection('userprofiles');
            
        return NextResponse.json({message: 'Success', success: true});
    } catch (error) {
        return NextResponse.json({message: 'Failed', success: false});
    }
}