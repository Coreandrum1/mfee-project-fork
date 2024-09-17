import mongoose, { Document } from 'mongoose';

interface IComment extends Document {
  _id: string;
  author: string;
  content: string;
}

const commentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, 'id is required']
    },
    author: {
      type: String,
      required: [true, 'Author is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
