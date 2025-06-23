const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    mobile: { type: String, required: false },
    pending_balance: { type: Number, default: 0 },
    trx_num: { type: String, required: false },
    status: { type: String, default: 'pending' },
});

export default mongoose.models.UserBalance || mongoose.model('UserBalance', UserSchema);