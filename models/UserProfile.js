const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    mobile: { type: String, required: false },
    password: { type: String, required: false },
    isVerified: { type: Boolean, default: false },
    image_url: { type: String, required: false },
    public_url: { type: String, required: false },
    address: { type: String, required: false },
    device_id: { type: String, required: false },
    cookies: { type: String, required: false },
    balance: { type: Number, default: 0 },
    active_balance: { type: Boolean, default: false },
    status: { type: String, default: 'pending' },
    isLogged: { type: Boolean, default: false },
    loggedExpire: { type: String, required: false }
});

export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserSchema);