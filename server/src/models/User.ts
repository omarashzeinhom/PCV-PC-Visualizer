import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email:string;
  password: string;
  avatar?: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
});

export default mongoose.model<IUser>('User', UserSchema);
