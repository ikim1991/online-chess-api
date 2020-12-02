import mongoose, { Schema, Document } from 'mongoose';

export interface UserI extends Document{
    name: string;
}

const UserSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const User = mongoose.model<UserI>("User", UserSchema);
export default User;