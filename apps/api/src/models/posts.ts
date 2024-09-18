import Crypto from 'crypto';
import { CuratedPost, Post } from '../types/types';
import PostSchema from '../schemas/post';
import Category from './category';
import CommentSchema from '../schemas/comment';
import { CATEGORIES, COMMENTS, POSTS } from '../data/initialData';
import mongoose from 'mongoose';

//Initialize the database records so we can test
export const initMongoRecords = async () => {
  await mongoose.connection.db.dropCollection('posts');
  await mongoose.connection.db.dropCollection('categories');
  await mongoose.connection.db.dropCollection('comments');
  await PostSchema.insertMany(POSTS);
  await Category.insertMany(CATEGORIES);
  await CommentSchema.insertMany(COMMENTS);
};

// 1. Get all posts
const getAllPosts = async () => {
  return await PostSchema.find({}).populate(['comments', 'category']).sort({ createdAt: -1 });
};

// 2. Get posts by category
const getPostsByCategory = async (category: string) => {
  const postsByCategory = await PostSchema.find({ category: category }).populate(['comments', 'category']).sort({ createdAt: -1 });
  return postsByCategory;
};

// 3. Get post by id
const getPostById = async (id: string) => {
  const postById = await PostSchema.find({ _id: id }).populate(['comments', 'category']);
  return postById;
};

// 4. Create post
const createPost = async (data: CuratedPost) => {
  // https://stackoverflow.com/questions/71185664/why-does-zod-make-all-my-schema-fields-optional
  // Zod make all my schema fields optional
  const newPost = {
    _id: Crypto.randomUUID(),
    comments: [],
    ...data
  };
  await PostSchema.create(newPost);
  return newPost;
};

// 5. Create post comment
const createPostComment = async (postId: string, comment: { author: string; content: string }) => {
  const newComment = {
    _id: Crypto.randomUUID(),
    ...comment
  };

  const foundPost = await PostSchema.findById(postId);
  if (!foundPost) {
    throw new Error('Post not found');
  }
  const createdComment = await CommentSchema.create(newComment);

  if (!createdComment) {
    throw new Error('Comment not created');
  }

  await PostSchema.updateOne({ _id: postId }, { $push: { comments: newComment._id } }, { new: true });
  return newComment;
};

// 6. Update post
const updatePost = async (postId: string, data: Partial<Post>) => {
  const updatedPost = await PostSchema.findOneAndUpdate({ _id: postId }, data, { new: true });
  return updatedPost;
};

// 7. Delete post
const deletePost = async (postId: string) => {
  const deletedPost = await PostSchema.findOneAndDelete({ _id: postId });
  const deletedComment = await CommentSchema.findOneAndDelete({ _id: postId });
  return { deletedComments: deletedComment, deletedPost: deletedPost };
};

export default {
  getAllPosts,
  getPostsByCategory,
  getPostById,
  createPost,
  createPostComment,
  updatePost,
  deletePost
};
