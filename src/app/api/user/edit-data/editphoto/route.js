import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../../lib/connectDB";
import { UploadImage } from "../../../../../../lib/cloudinary/cloud-image";
import cloudinary from "../../../../../../lib/cloudinary/cloud-config";

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const email = formData.get('email');
        const newImage = formData.get('newImage');
        const public_url = formData.get('public_url');

        if (!newImage || !email) {
            return NextResponse.json({ message: 'select a photo', success: false });
        }
        const collection = (await dbConnection()).collection('userprofiles');
        public_url && await cloudinary.uploader.destroy(public_url.toString());
        const setImg = await UploadImage(newImage, "user");

        await collection.findOneAndUpdate({ email }, {
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