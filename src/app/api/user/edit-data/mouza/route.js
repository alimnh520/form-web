import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";
import cloudinary from "../../../../../../lib/cloudinary/cloud-config";

export const POST = async (request) => {
    try {
        const { id, type, sourceUrl, publicUrl, publicId, email } = await request.json();
        console.log(sourceUrl);

        if (type === 'cancel') {
            const collection = (await dbConnection()).collection('mouzamaps');
            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'reject'
                }
            });

            const collectionUser = (await dbConnection()).collection('userprofiles');
            await collectionUser.findOneAndUpdate({ email }, {
                $inc: {
                    balance: 100
                }
            });
            return NextResponse.json({ message: 'successful', success: true });

        } else if (type === 'accept' && !sourceUrl) {
            const collection = (await dbConnection()).collection('mouzamaps');
            await collection.findOneAndUpdate({ _id: new ObjectId(id) }, {
                $set: {
                    status: 'complete',
                }
            });
            return NextResponse.json({ message: 'successful', success: true });
        } else {
            publicUrl && await cloudinary.uploader.destroy(publicUrl.toString(), { resource_type: 'raw' });

            const collection = (await dbConnection()).collection('mouzamaps');
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