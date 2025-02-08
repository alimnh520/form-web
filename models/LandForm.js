import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
    topCrokimNmbr: { type: String, required: true },
    moujarNam: { type: String, required: true },
    unionNum: { type: String, required: true },
    thana: { type: String, required: true },
    district: { type: String, required: true },
    holdingNmbr: { type: String, required: true },
    khatianNmbr: { type: String, required: true },
    ownerData: { type: Array, required: true },
    landData: { type: Array, required: true },
    totalLand: { type: String, required: true },
    loanPlus: { type: String, required: true },
    loan: { type: String, required: true },
    loanFine: { type: String, required: true },
    halDabi: { type: String, required: true },
    totalDabi: { type: String, required: true },
    totalAdai: { type: String, required: true },
    totalLoan: { type: String, required: true },
    totalAmount: { type: String, required: true },
    calanNumber: { type: String, required: true },
    year: { type: String, required: true },
    banglaDate: { type: String, required: true },
    englishDate: { type: String, required: true },
});

export default mongoose.models.LandForm || mongoose.model('LandForm', FormSchema);
