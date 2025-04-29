const { default: mongoose } = require("mongoose");

const SelfLandSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    status: { type: String, default: 'pending' },
    action: { type: String, required: false },
    divisionName: { type: String, required: true },
    districtName: { type: String, required: true },
    upazilaName: { type: String, required: true },
    mouzaName: { type: String, required: true },
    khatianName: { type: String, required: true },
});

export default mongoose.models.SelfLandTax || mongoose.model('SelfLandTax', SelfLandSchema);
