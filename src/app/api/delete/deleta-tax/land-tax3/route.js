import { NextResponse } from "next/server"
import { dbConnection } from "../../../../../../lib/connectDB";
import { ObjectId } from "mongodb";
import cloudinary from "../../../../../../lib/cloudinary/cloud-config";

export const POST = async (request) => {
    try {
        const { userId } = await request.json();
        const collection = (await dbConnection()).collection('landtax3');
        const data = await collection.findOne({ _id: new ObjectId(userId)});
        const imgId = data.imgId;
        for (const id of imgId) {
            await cloudinary.uploader.destroy(id.toString());
        }
        await collection.deleteOne({ _id: new ObjectId(userId) });
        return NextResponse.json({ message: 'delete successfully', success: true });

    } catch (error) {
        return NextResponse.json({ message: 'failed to delete data', success: false});
    }
}