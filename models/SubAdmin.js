const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    image_url: { type: String, required: false },
    public_url: { type: String, required: false },
    workList: [String]
});

export default mongoose.models.admin || mongoose.model('admin', UserSchema);