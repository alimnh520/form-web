import connectDb from '../../../../lib/mongodb';
import LandTax from '../../../../models/LandTax';

export async function POST(request) {
    const { divisionName, districtName, upazilaName, mouzaName, khatianName, mobile} = await request.json();
    await connectDb();
    const newUser = new LandTax({
        divisionName, 
        districtName, 
        upazilaName, 
        mouzaName, 
        khatianName, 
        mobile
    });

    try {
        await newUser.save();
        return new Response(
            JSON.stringify({ message: 'User created successfully' }),
            { status: 201 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error saving user', error }),
            { status: 500 }
        );
    }
}
