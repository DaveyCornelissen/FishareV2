import * as mongoose from 'mongoose';

export const IdentitySchema = new mongoose.Schema({
    id: Number,
    token: String,
    email: String,
    password: String
});

