import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { email, newName } = await request.json();
        if (!newName || ! email) {
            return NextResponse.json({ message: 'select a name', success: false });
        }
        const collection = (await dbConnection()).collection('userprofiles');
        const coll2 = (await dbConnection()).collection('servernids');
        const coll3 = (await dbConnection()).collection('nidcards');
        const coll4 = (await dbConnection()).collection('dcrpayments');
        const coll5 = (await dbConnection()).collection('selflandtaxes');
        const coll6 = (await dbConnection()).collection('landtaxes');
        const coll7 = (await dbConnection()).collection('landtax2');
        const coll8 = (await dbConnection()).collection('userbalances');
        const coll9 = (await dbConnection()).collection('drivings');

        await collection.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });
        await coll2.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });
        await coll3.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });
        await coll4.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });
        await coll5.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });
        await coll6.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });
        await coll7.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });
        await coll8.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });
        await coll9.findOneAndUpdate({ email }, {
            $set: {
                username: newName
            }
        });

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}