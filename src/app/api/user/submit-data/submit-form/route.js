import { NextResponse } from "next/server";
import LandForm from "../../../../../../models/LandForm";
import { connectDb } from "../../../../../../lib/mongodb";

export const POST = async (request) => {
    await connectDb();
    try {
        const reqBody = await request.json();

        const { topCrokimNmbr, moujarNam, unionNum, thana, district, holdingNmbr, khatianNmbr, ownerData, landData, totalLand, loanPlus, loan, loanFine, halDabi, totalDabi, totalAdai, totalLoan, totalAmount, calanNumber, year, banglaDate, englishDate } = reqBody;

        console.log('The user data is : ', topCrokimNmbr, moujarNam, unionNum, thana, district, holdingNmbr, khatianNmbr, ownerData, landData, totalLand, loanPlus, loan, loanFine, halDabi, totalDabi, totalAdai, totalLoan, totalAmount, calanNumber, year, banglaDate, englishDate);

        const saveData = new LandForm({
            topCrokimNmbr: topCrokimNmbr,
            moujarNam: moujarNam,
            unionNum: unionNum,
            thana: thana,
            district: district,
            holdingNmbr: holdingNmbr,
            khatianNmbr: khatianNmbr,
            ownerData: ownerData,
            landData: landData,
            totalLand: totalLand,
            loanPlus: loanPlus,
            loan: loan,
            loanFine: loanFine,
            halDabi: halDabi,
            totalDabi: totalDabi,
            totalAdai: totalAdai,
            totalLoan: totalLoan,
            totalAmount: totalAmount,
            calanNumber: calanNumber,
            year: year,
            banglaDate: banglaDate,
            englishDate: englishDate,
        });
        await saveData.save();

        return NextResponse.json({ message: 'form submit successful' });
    } catch (error) {
        return NextResponse.json({ message: 'The error is : ', error });
    }
}