import mongoose from 'mongoose';

const DrcSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    mobile: { type: String, required: false },
    nid: { type: String, required: false },
    fatherNid: { type: String, required: false },
    motherNid: { type: String, required: false },
    bill: { type: String, required: false },
    status: { type: String, default: 'pending' },
    action: { type: String, required: false },
    pdf_url: { type: String, required: false },
});

export default mongoose.models.Driving || mongoose.model('Driving', DrcSchema);