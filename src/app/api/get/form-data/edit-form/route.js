import { NextResponse } from "next/server";
import { dbConnection } from "../../../../../../lib/connectDB";
import { ObjectId } from "mongodb";

export const POST = async (request) => {
    const db = await dbConnection();
    const coll = db.collection('landforms');
    try {
        const { id, type, landData, ownerData, topCrokimNmbr, unionNum, moujarNam, thana, district, holdingNmbr, khatianNmbr, totalLand, loanPlus, loan, loanFine, halDabi, totalDabi, totalAdai, totalLoan, totalAmount, year, calanNumber, banglaDate, englishDate } = await request.json();

        if (topCrokimNmbr) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {topCrokimNmbr: topCrokimNmbr}}
            );
        }
        if (unionNum) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {unionNum: unionNum}}
            );
        }
        if (moujarNam) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {moujarNam: moujarNam}}
            );
        }
        if (thana) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {thana: thana}}
            );
        }
        if (district) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {district: district}}
            );
        }
        if (holdingNmbr) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {holdingNmbr: holdingNmbr}}
            );
        }
        if (khatianNmbr) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {khatianNmbr: khatianNmbr}}
            );
        }
        if (totalLand) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {totalLand: totalLand}}
            );
        }
        if (loanPlus) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {loanPlus: loanPlus}}
            );
        }
        if (loan) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {loan: loan}}
            );
        }
        if (loanFine) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {loanFine: loanFine}}
            );
        }
        if (halDabi) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {halDabi: halDabi}}
            );
        }
        if (totalDabi) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {totalDabi: totalDabi}}
            );
        }
        if (totalAdai) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {totalAdai: totalAdai}}
            );
        }
        if (totalLoan) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {totalLoan: totalLoan}}
            );
        }
        if (totalAmount) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {totalAmount: totalAmount}}
            );
        }
        if (year) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {year: year}}
            );
        }
        if (calanNumber) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {calanNumber: calanNumber}}
            );
        }
        if (banglaDate) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {banglaDate: banglaDate}}
            );
        }
        
        if (englishDate) {
            await coll.updateOne(
                {_id: new ObjectId(id)},
                { $set: {englishDate: englishDate}}
            );
        }

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