import mongoose from 'mongoose';

const LandSchema2 = new mongoose.Schema({
    divisionName: { type: String, required: true },
    districtName: { type: String, required: true },
    upazilaName: { type: String, required: true },
    mouzaName: { type: String, required: true },
    khatianName: { type: String, required: true },
    mobile: { type: Number, required: true },
    nidNum: { type: Number, required: true },
    dobNum: { type: Date, required: true },
});

export default mongoose.models.LandTax2 || mongoose.model('LandTax2', LandSchema2);
