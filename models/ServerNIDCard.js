const { default: mongoose } = require("mongoose");

const ServerNIDSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    voternum: { type: String, required: false },
    dob: { type: String, required: false },
});

export default mongoose.models.serverNid || mongoose.model('serverNid', ServerNIDSchema);