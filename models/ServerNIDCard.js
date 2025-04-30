const { default: mongoose } = require("mongoose");

const ServerNIDSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    voternum: { type: String, required: false },
    nidnum: { type: String, required: false },
    dob: { type: String, required: false },
    status: { type: String, default: 'pending' },
    action: { type: String, required: false },
    pdf_url: { type: String, required: false },
});

export default mongoose.models.serverNid || mongoose.model('serverNid', ServerNIDSchema);