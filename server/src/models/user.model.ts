import mongoose, { Document, Schema,Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  builds: Types.ObjectId[];  // Array of ObjectIds that reference the builds
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  builds: [{ type: Types.ObjectId, ref: 'Build' }],  

});
  

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };