import mongoose from 'mongoose';

export interface LoginUserAttrs {
    email: string;
    password: string;
}

export interface RegisterUserAttrs {
    name: string;
    email: string;
    password: string;
}

export interface UserAttrs {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface UserHeadersAttrs {
    email: string;
    userId: string;
}

const authSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
    },
    {timestamps: true}
);

export const Auth = mongoose.model('Auth', authSchema);