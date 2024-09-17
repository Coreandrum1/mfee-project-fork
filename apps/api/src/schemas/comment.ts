import mongoose from 'mongoose';

interface IComment extends mongoose.Document {
  id: string;
  author: string;
  content: string;
}

const commentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Property is required']
    },
    author: {
      type: String,
      required: [true, 'Property is required']
    },
    content: {
      type: String,
      required: [true, 'Property is required']
    }
  },
  {
    timestamps: true
  }
);

const CommentSchema = mongoose.model<IComment>('Comment', commentSchema);

export default CommentSchema;
