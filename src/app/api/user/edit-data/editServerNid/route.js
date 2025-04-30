import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";
import cloudinary from "../../../../../../lib/cloudinary/cloud-config";
import { UploadImage } from "../../../../../../lib/cloudinary/cloud-image";

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const id = formData.get('id');
        const type = formData.get('type');
        const pdfFile = formData.get('pdfFile');
        const publicUrl = formData.get('publicUrl');

        if (type === 'accept') {

            publicUrl && await cloudinary.uploader.destroy(publicUrl.toString(), { resource_type: 'raw' });
            const userPdf = await UploadImage(pdfFile, "user");

            const collection = (await dbConnection()).collection('nidcards');
            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'complete',
                    action: userPdf.secure_url,
                    pdf_url: userPdf.public_id
                }
            });
        }

        if (type === 'cancel') {
            const collection = (await dbConnection()).collection('nidcards');
            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'reject'
                }
            });
        }


        return NextResponse.json({ message: 'successful', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}