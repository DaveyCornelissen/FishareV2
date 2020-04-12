import { Document } from 'mongoose';

export interface Identity extends Document {
    userID: Number;
    email: String;
    password: String;
}