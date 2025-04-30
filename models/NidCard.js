const { default: mongoose } = require("mongoose");

const NIDSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    voternum: { type: String, required: false },
    nidnum: { type: String, required: false },
    dob: { type: String, required: false },
});

export default mongoose.models.nidcard || mongoose.model('nidcard', NIDSchema);