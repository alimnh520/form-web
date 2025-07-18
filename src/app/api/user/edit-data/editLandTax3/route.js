import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";
import cloudinary from "../../../../../../lib/cloudinary/cloud-config";

export const POST = async (request) => {
    try {
        const { id, type, sourceUrl, publicUrl, publicId, email } = await request.json();

        if (type === 'cancel') {
            const collection = (await dbConnection()).collection('landtax3');
            const user = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'reject'
                }
            });

            await cloudinary.uploader.destroy(user.dakhila_id.toString(), { resource_type: 'raw' });
            await cloudinary.uploader.destroy(user.photo_id.toString(), { resource_type: 'image' });
            await cloudinary.uploader.destroy(user.dolil_id.toString(), { resource_type: 'raw' });
            await cloudinary.uploader.destroy(user.khatian_id.toString(), { resource_type: 'raw' });

            const collectionUser = (await dbConnection()).collection('userprofiles');
            await collectionUser.findOneAndUpdate({ email }, {
                $inc: {
                    balance: 570
                }
            });
            return NextResponse.json({ message: 'successful', success: true });

        } else {

            publicUrl && await cloudinary.uploader.destroy(publicUrl.toString(), { resource_type: 'raw' });

            const collection = (await dbConnection()).collection('landtax3');

            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'complete',
                    action: sourceUrl,
                    pdf_url: publicId
                }
            });
            return NextResponse.json({ message: 'successful', success: true });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}