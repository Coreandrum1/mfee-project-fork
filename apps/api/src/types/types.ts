export interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
}
