import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { email } = await request.json();
        const collection = (await dbConnection()).collection('userprofiles');
        await collection.deleteOne({ _id: new ObjectId(email) });
        return NextResponse.json({ message: 'success', success: true });

        // const collections = [
        //     'userprofiles',
        //     'servernids',
        //     'nidcards',
        //     'dcrpayments',
        //     'selflandtaxes',
        //     'landtaxes',
        //     'landtax2',
        //     'userbalances',
        //     'drivings',
        //     'mouzamaps',
        //     'landtax3'
        // ]

        // for (const collection of collections) {
        //     const dataDelete = (await dbConnection()).collection(collection);
        //     await dataDelete.deleteMany({ email });
        // }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}
