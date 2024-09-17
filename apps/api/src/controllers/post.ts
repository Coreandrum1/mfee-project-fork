import { Request, Response } from 'express';
import { validateComment, validatePartialPost, validatePost } from '../helpers/validators';
import postModel from '../models/posts';

// 1. Get all posts
const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postModel.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

// 2. Get posts by category
const getPostsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;

  try {
    const posts = await postModel.getPostsByCategory(category);
    if (!posts.length) {
      return res.status(404).json({ message: `Posts not found for category ${category}` });
    }
    res.status(200).json(posts);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

// 3. Get post by id
const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await postModel.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

// 4. Create post
const createPost = async (req: Request, res: Response) => {
  const validationResult = validatePost(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
  }

  try {
    const newPost = await postModel.createPost(validationResult.data);
    res.status(201).json(newPost);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

// 5. Create post comment
const createPostComment = async (req: Request, res: Response) => {
  const validationResult = validateComment(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
  }
  const { id } = req.params;

  try {
    const newComment = await postModel.createPostComment(id, validationResult.data);
    res.status(201).json(newComment);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

// 6. Update post
const updatePost = async (req: Request, res: Response) => {
  const validationResult = validatePartialPost(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: JSON.parse(validationResult.error.message) });
  }
  const { id } = req.params;

  try {
    const updatedPost = await postModel.updatePost(id, validationResult.data);
    res.status(200).json(updatedPost);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
};

// 7. Delete post
const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedPost = await postModel.deletePost(id);
    console.log(deletedPost);
    res.status(204).send({ message: `Post deleted successfully` });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
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
