const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    mobile: { type: String, required: false },
    dcrPayment: { type: String, required: false },
    divisionName: { type: String, required: false },
    status: { type: String, default: 'pending'},
    action: { type: String, required: false },
});

export default mongoose.models.DCRPayent || mongoose.model('DCRPayent', UserSchema);