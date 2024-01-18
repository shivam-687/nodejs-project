import mongoose, { Document, Schema } from 'mongoose';
import { IUserDocument } from './user';

export interface Post extends Document {
  title: string;
  body: string;
  user: IUserDocument['_id'];
  isActive: boolean;
  geoLocation: {
    type: string;
    coordinates: [number, number];
  };
}

const PostSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    geoLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

PostSchema.index({ 
  geoLocation: '2dsphere' 
},{
  name: "geoLocation_2dsphere",
  "2dsphereIndexVersion": 3
});

export const PostModel = mongoose.model<Post>('Post', PostSchema);
