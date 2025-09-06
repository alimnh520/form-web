import { ObjectId } from "mongodb";
import { dbConnection } from "../../../../../../lib/connectDB";
export const POST = async (request) => {
    try {
        const { uddoktaId } = await request.json();
        const collection = (await dbConnection()).collection('userprofiles');
        await collection.deleteOne({ _id: new ObjectId(uddoktaId) });
        return NextResponse.json({ message: 'successful', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'failed', success: false });
    }
}
