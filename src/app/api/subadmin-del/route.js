import { NextResponse } from "next/server"
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../lib/connectDB";
import cloudinary from "../../../../lib/cloudinary/cloud-config";

export const POST = async (request) => {
    try {
        const { userId, public_url } = await request.json();
        public_url && await cloudinary.uploader.destroy(public_url.toString());
        const collection = (await dbConnection()).collection('admin');
        await collection.deleteOne({ _id: new ObjectId(userId) });
        return NextResponse.json({ message: 'data deleted successfully', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed to delete data' });
    }
}