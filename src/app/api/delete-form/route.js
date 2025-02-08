import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/mongodb";

export const POST = async (request) => {
    try {
        const { userID } = await request.json();
        const db = await connectDb();
        const collection = db.collection("landforms");
        const result = await collection.deleteOne({ _id: new ObjectId(userID) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "No document found" }, { status: 404 });
        }

        return NextResponse.json({ message: 'success to delete' });
    } catch (error) {
        return NextResponse.json({ message: 'failed to delete' });
    }
}