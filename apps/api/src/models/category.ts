import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
  name: string;
  _id: string;
}

export const categorySchema = new Schema<ICategory>(
  {
    _id: {
      type: String,
      required: [true, 'id is required']
    },
    name: {
      type: String,
      required: [true, 'Property is required']
    }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
