const { default: mongoose } = require("mongoose");

const LandSchema3 = new mongoose.Schema({
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
    khatian_url: { type: String, required: false },
    khatian_id: { type: String, required: false },
    dolil_url: { type: String, required: false },
    dolil_id: { type: String, required: false },
    photo_url: { type: String, required: false },
    photo_id: { type: String, required: false },
    dakhila_url: { type: String, required: false },
    dakhila_id: { type: String, required: false },
});

export default mongoose.models.LandTax3 || mongoose.model('LandTax3', LandSchema3);
