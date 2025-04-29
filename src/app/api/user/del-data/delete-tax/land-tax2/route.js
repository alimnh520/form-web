import { NextResponse } from "next/server"
import { dbConnection } from "../../../../../../../lib/connectDB";
import { ObjectId } from "mongodb";

export const POST = async (request) => {
    try {
        const { userId } = await request.json();
        console.log('User is is : ', userId);

        const collection = (await dbConnection()).collection('landtax2');
        await collection.deleteOne({_id: new ObjectId(userId)});
        
        return NextResponse.json({ message: 'data deleted successfully', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed to delete data' });
    }
}