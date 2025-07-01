import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { email, newName } = await request.json();
        if (!newName || !email) {
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
        const coll10 = (await dbConnection()).collection('mouzamaps');
        const coll11 = (await dbConnection()).collection('landtax3');

        await collection.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll2.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll3.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll4.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll5.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll6.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll7.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll8.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll9.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll10.updateMany({ email }, {
            $set: {
                username: newName
            }
        });
        await coll11.updateMany({ email }, {
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