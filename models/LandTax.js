const { default: mongoose } = require("mongoose");

const LandSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    status: { type: String, default: 'pending' },
    action: { type: String, required: false },
    divisionName: { type: String, required: false },
    districtName: { type: String, required: false },
    upazilaName: { type: String, required: false },
    mouzaName: { type: String, required: false },
    khatianName: { type: String, required: false },
    mobile: { type: String, required: false },
})

export default mongoose.models.LandTax || mongoose.model('LandTax', LandSchema);