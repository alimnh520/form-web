import mongoose from 'mongoose';

const LandSchema2 = new mongoose.Schema({
    divisionName: { type: String, required: true },
    districtName: { type: String, required: true },
    upazilaName: { type: String, required: true },
    mouzaName: { type: String, required: true },
    khatianName: { type: String, required: true },
    mobile: { type: String, required: true },
    nidNum: { type: String, required: true },
    dobNum: { type: String, required: true },
});

export default mongoose.models.LandTax2 || mongoose.model('LandTax2', LandSchema2);
