import connectDb from '../../../../lib/mongodb';
import LandTax2 from '../../../../models/LandTax2';

export async function POST(request) {
    const { divisionName, districtName, upazilaName, mouzaName, khatianName, mobile, nidNum, dobNum} = await request.json();
    await connectDb();
    const newUser = new LandTax2({
        divisionName, 
        districtName, 
        upazilaName, 
        mouzaName, 
        khatianName, 
        mobile,
        nidNum, 
        dobNum
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
