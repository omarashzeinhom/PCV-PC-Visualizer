import mongoose, { Schema, Document,Types } from 'mongoose';
import { Component } from './component.model';

interface IBuild extends Document {
  components: Component[];
  buildName: string;
  userId: Types.ObjectId;
}

const BuildSchema: Schema = new Schema({
  components: [{
    type: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    imageSrc: { type: String },
    link: { type: String },
    specs: { type: String },
  }],
  buildName: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

 const Build = mongoose.model<IBuild>('Build', BuildSchema);

export { Build, IBuild };