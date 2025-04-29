import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export const POST = async (request) => {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    const db = client.db('test');
    const coll = db.collection('landforms');

    try {
        const body = await request.json();
        const id = body.userId;
        await coll.deleteOne({_id: new ObjectId(id)}); 

        return NextResponse.json({ message: 'success to delete', success: true});
    } catch (error) {
        return NextResponse.json({ message: 'failed to delete' });
    }
}