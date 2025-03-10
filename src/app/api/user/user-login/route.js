import { NextResponse } from "next/server"

export const POST = async(request) => {
    const collection = (await dbConnection()).collection('userprofiles');
    try {
        const data = await request.json();
        const type = data.type;
        const { username, email, mobile } = data.user;

        if (type) {
            const user = await collection.findOne({mobile});
            if (!user) {
                return NextResponse.json({ message: 'User not register', success: false });
            }
        }

        if (!type) {
            const user = await collection.findOne({email});
            if (!user) {
                return NextResponse.json({ message: 'User not register', success: false });
            }
        }

        return NextResponse.json({message: 'Login successful'});
    } catch (error) {
        return NextResponse.json({message: 'Failed to login'});
    }
}