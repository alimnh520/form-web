import { NextResponse } from "next/server"
import { dbConnection } from "../../../../lib/connectDB";

export const POST = async (request) => {
    try {
        const { nidNum, email } = await request.json();

        const collection = (await dbConnection()).collection('userprofiles');
        const userData = await collection.findOne({ email });

        if (!userData.active_balance) {
            return NextResponse.json({ message: '', success: false });
        }

        if (userData.balance < 150) {
            return NextResponse.json({ message: 'পর্যাপ্ত ব্যালেন্স নেই!', success: false });
        }

        const res = await fetch(`https://api2.bdx.today/ddos-new/land.php?nid=${nidNum}`, {
            method: 'GET',
        });

        const data = await res.json();

        if (data.response.success) {
            await collection.findOneAndUpdate({ email }, {
                $inc: {
                    balance: -150
                }
            });
        }

        return NextResponse.json({ message: data.response, success: true });

    } catch (error) {
        return NextResponse.json({ message: 'Failed', success: false });
    }
}