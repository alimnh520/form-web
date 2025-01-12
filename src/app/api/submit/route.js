import connectDb from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request) {
    const { name, email, age, number } = await request.json();
    await connectDb();
    const newUser = new User({
        name,
        email,
        age,
        number
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
