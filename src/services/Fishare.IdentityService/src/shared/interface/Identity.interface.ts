import { Document } from 'mongoose';

export interface Identity extends Document {
    token: String;
    email: String;
    password: String;
}