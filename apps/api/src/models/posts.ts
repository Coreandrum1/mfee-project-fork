import Crypto from 'crypto';
import { CuratedPost, Post } from '../types/types';
import PostSchema from '../schemas/post';
import Category from './category';
import CommentSchema from '../schemas/comment';
import { CATEGORIES, COMMENTS, POSTS } from '../data/initialData';

//Initialize the database records so we can test
const initMongoRecords = async () => {
  await PostSchema.deleteMany({});
  await Category.deleteMany({});
  await CommentSchema.deleteMany({});
  await PostSchema.create(POSTS);
  await Category.create(CATEGORIES);
  await CommentSchema.create(COMMENTS);
};

initMongoRecords();

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

  const foundPost = await PostSchema.findOne({ _id: postId });
  if (!foundPost) {
    throw new Error('Post not found');
  }

  await PostSchema.updateOne({ _id: postId }, { $push: { comments: newComment._id } });
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
