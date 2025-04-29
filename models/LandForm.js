import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
    topCrokimNmbr: { type: String, required: false },
    moujarNam: { type: String, required: false },
    unionNum: { type: String, required: false },
    thana: { type: String, required: false },
    district: { type: String, required: false },
    holdingNmbr: { type: String, required: false },
    khatianNmbr: { type: String, required: false },
    ownerData: { type: Array, required: false },
    landData: { type: Array, required: false },
    totalLand: { type: String, required: false },
    loanPlus: { type: String, required: false },
    loan: { type: String, required: false },
    loanFine: { type: String, required: false },
    halDabi: { type: String, required: false },
    totalDabi: { type: String, required: false },
    totalAdai: { type: String, required: false },
    totalLoan: { type: String, required: false},
    totalAmount: { type: String, required: false },
    calanNumber: { type: String, required: false },
    year: { type: String, required: false },
    banglaDate: { type: String, required: false },
    englishDate: { type: String, required: false },
});

export default mongoose.models.LandForm || mongoose.model('LandForm', FormSchema);
