import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../lib/connectDB";
import { UploadImage } from "../../../../../lib/cloudinary/cloud-image";
import cloudinary from "../../../../../lib/cloudinary/cloud-config";

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const username = formData.get('username');
        const newImage = formData.get('newImage');
        const public_url = formData.get('public_url');

        if (!newImage || !username) {
            return NextResponse.json({ message: 'select a photo', success: false });
        }
        const collection = (await dbConnection()).collection('admin');
        public_url && await cloudinary.uploader.destroy(public_url.toString());
        const setImg = await UploadImage(newImage, "user", 'image');

        await collection.findOneAndUpdate({ username }, {
            $set: {
                image_url: setImg.secure_url,
                public_url: setImg.public_id
            }
        });

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}