export interface Post {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: string[];
}

export interface CuratedPost {
  title: string;
  image: string;
  description: string;
  category: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
}
