import mongoose from 'mongoose';

const LandSchema = new mongoose.Schema({
    divisionName: { type: String, required: true },
    districtName: { type: String, required: true },
    upazilaName: { type: String, required: true },
    mouzaName: { type: String, required: true },
    khatianName: { type: String, required: true },
    mobile: { type: String, required: true },
});

export default mongoose.models.LandTax || mongoose.model('LandTax', LandSchema);
