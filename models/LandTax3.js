import mongoose from 'mongoose';

const LandSchema3 = new mongoose.Schema({
    divisionName: { type: String, required: true },
    districtName: { type: String, required: true },
    upazilaName: { type: String, required: true },
    mouzaName: { type: String, required: true },
    khatianName: { type: Number, required: true },
    mobile: { type: Number, required: true },
    khatian: { type: String, required: true },
    dolil: { type: String, required: true },
    photo: { type: String, required: true },
    dakhila: { type: String, required: true },
});

export default mongoose.models.LandTax3 || mongoose.model('LandTax3', LandSchema3);
