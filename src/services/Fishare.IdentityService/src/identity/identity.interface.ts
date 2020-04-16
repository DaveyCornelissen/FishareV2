import { Document } from 'mongoose';

export interface Identity extends Document {
    email: string;
    password: string;
}