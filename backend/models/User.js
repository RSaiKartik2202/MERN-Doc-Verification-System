import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Institution', 'Company'],
        default: 'User',
        required: true,
    },
    institutionCode: {
        type: String,
    },
});

export default model('User', userSchema);