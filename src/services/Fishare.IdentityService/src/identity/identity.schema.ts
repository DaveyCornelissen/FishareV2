import * as mongoose from 'mongoose';

export const IdentitySchema = new mongoose.Schema({
    email: String,
    password: String
});

