import mongoose from 'mongoose';

interface IPost extends mongoose.Document {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: string[];
}

const postSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Property is required']
    },
    title: {
      type: String,
      required: [true, 'Property is required']
    },
    image: {
      type: String,
      required: [true, 'Property is required']
    },
    description: {
      type: String,
      required: [true, 'Property is required']
    },
    category: {
      type: String,
      required: [true, 'Property is required']
    },
    comments: {
      type: [String],
      required: [true, 'Property is required']
    }
  },
  {
    timestamps: true
  }
);

const PostSchema = mongoose.model<IPost>('Post', postSchema);

export default PostSchema;
