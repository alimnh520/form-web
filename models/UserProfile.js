const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: false },
    mobile: { type: String, required: false },
    password: { type: String, required: false },
    isVerified: {type: Boolean, default: false},
    image_url: {type: String, default: false},
    public_url: {type: String, default: false},
    balance: {type: Number, default: 0},
});

export default mongoose.models.UserProfile  || mongoose.model('UserProfile', UserSchema);