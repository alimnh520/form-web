import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../../lib/connectDB";
import { ObjectId } from "mongodb";

export const POST = async (request) => {
    const db = await dbConnection();
    const coll = db.collection('landforms');
    try {
        const { id, type, landData, ownerData } = await request.json();

        if (type === 'owner') {
            await coll.updateOne(
                {_id: new ObjectId(id)}, 
                {$pop: {ownerData: 1}}
            );
            return NextResponse.json({ message: 'added successfully', success: true });
        }
        
        if (type === 'land') {
            await coll.updateOne(
                {_id: new ObjectId(id)}, 
                {$pop: {landData: 1}}
            );
            return NextResponse.json({ message: 'added successfully', success: true });
        }

        await coll.updateOne(
            {_id: new ObjectId(id)},
            {$push: {ownerData: {$each: ownerData}}},
            {$push: {landData: {$each: landData}}}
        )
        await coll.updateOne(
            {_id: new ObjectId(id)},
            {$push: {landData: {$each: landData}}}
        )

        return NextResponse.json({ message: 'Updated successfully', success: true });
    } catch (error) {
        return NextResponse.json({ message: 'failed to delete', success: true });
    }
}