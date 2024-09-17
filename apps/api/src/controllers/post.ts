import { Request, Response } from 'express';
import { Post } from '../types/types';
import Crypto from 'crypto';
import { validateComment, validatePartialPost, validatePost } from '../helpers/validators';

const POSTS: Post[] = [
  //Example post
  {
    id: 'a47f5337-16f2-49a0-bc14-e97bb24b56a9',
    title: 'Post Test Postman',
    image:
      'https://images.unsplash.com/photo-1556276797-5086e6b45ff9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=800',
    description: 'Description from Postman',
    category: '1',
    comments: [
      {
        id: Crypto.randomUUID(),
        author: 'MFEE',
        content: 'Good content'
      }
    ]
  }
];

// 1. Get all posts
const getPosts = (req: Request, res: Response) => {
  res.status(200).json(POSTS);
};

// 2. Get posts by category
const getPostsByCategory = (req: Request, res: Response) => {
  const { category } = req.params;
  const posts = POSTS.filter((p) => p.category === category);
  if (!posts.length) {
    return res.status(404).json({ message: `Posts not found for category ${category}` });
  }
  res.status(200).json(posts);
};

// 3. Get post by id
const getPostById = (req: Request, res: Response) => {
  const { id } = req.params;
  const post = POSTS.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json(post);
};

// 4. Create post
const createPost = (req: Request, res: Response) => {
  const validationResult = validatePost(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
  }

  // https://stackoverflow.com/questions/71185664/why-does-zod-make-all-my-schema-fields-optional
  // Zod make all my schema fields optional
  const newPost = {
    id: Crypto.randomUUID(),
    comments: [],
    ...validationResult.data
  };

  POSTS.push(newPost);

  res.status(201).json(newPost);
};

// 5. Create post comment
const createPostComment = (req: Request, res: Response) => {
  const validationResult = validateComment(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
  }

  const { id } = req.params;
  const postIndex = POSTS.findIndex((p) => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Cannot find post to add comment' });
  }

  const newComment = {
    id: Crypto.randomUUID(),
    ...validationResult.data
  };

  POSTS[postIndex].comments.push(newComment);

  res.status(201).json(newComment);
};

// 6. Update post
const updatePost = (req: Request, res: Response) => {
  const validationResult = validatePartialPost(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
  }

  const { id } = req.params;
  const postIndex = POSTS.findIndex((p) => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const updatedPost = { ...POSTS[postIndex], ...validationResult.data };
  POSTS[postIndex] = updatedPost;

  res.status(200).json(updatedPost);
};

// 7. Delete post
const deletePost = (req: Request, res: Response) => {
  const { id } = req.params;
  const postIndex = POSTS.findIndex((p) => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  POSTS.splice(postIndex, 1);

  res.status(204).send();
};

export default {
  getPosts,
  getPostsByCategory,
  getPostById,
  createPost,
  createPostComment,
  updatePost,
  deletePost
};
