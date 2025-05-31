import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/mongodb";
import { dbConnection } from "../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { username, newList, item } = await request.json();

        const collection = (await dbConnection()).collection('admin');

        if (item) {
            await collection.findOneAndUpdate({ username }, {
                $pull: { workList: item }
            });
        }
        await collection.findOneAndUpdate({ username }, {
            $push: {
                workList: {
                    $each: newList
                }
            }
        })

        return NextResponse.json({ message: 'Success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Failed', success: false });
    }
}
