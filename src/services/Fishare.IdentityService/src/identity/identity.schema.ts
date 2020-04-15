import * as mongoose from 'mongoose';

export const IdentitySchema = new mongoose.Schema({
    UserID: Number,
    email: String,
    password: String
});

