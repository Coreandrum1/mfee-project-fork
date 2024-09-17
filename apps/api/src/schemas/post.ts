import mongoose from 'mongoose';

interface IPost extends mongoose.Document {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: string[];
}

const postSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, 'id is required']
    },
    title: {
      type: String,
      required: [true, 'title is required']
    },
    image: {
      type: String,
      required: [true, 'image is required']
    },
    description: {
      type: String,
      required: [true, 'description is required']
    },
    category: {
      type: mongoose.Schema.Types.String, // Foreign key
      ref: 'Category',
      required: [true, 'category is required']
    },
    comments: {
      type: [mongoose.Schema.Types.String], // Foreign key
      ref: 'Comment',
      required: [true, 'comments is required']
    }
  },
  {
    timestamps: true
  }
);

const PostSchema = mongoose.model<IPost>('Post', postSchema);

export default PostSchema;
