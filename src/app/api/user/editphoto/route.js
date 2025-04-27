import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../lib/connectDB";
import { UploadImage } from "../../../../../lib/cloudinary/cloud-image";
import cloudinary from "../../../../../lib/cloudinary/cloud-config";

export const POST = async (request) => {
    try {
        // const { email, newImage } = await request.json();
        // if (!newImage || !email) {
        //     return NextResponse.json({ message: 'select a name', success: false });
        // }
        // const collection = (await dbConnection()).collection('userprofiles');

        // const setImg = await UploadImage(newImage, "user");
        
        // const user = await collection.findOneAndUpdate({ email }, {
        //     $set: {
        //         username: newName
        //     }
        // });


        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}