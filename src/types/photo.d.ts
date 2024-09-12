export interface Photo {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: string;
  total_comments: string;
}

export interface Comment {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_content: string;
}

export interface PhotoWithComments {
  photo: Photo;
  comments: Comment[];
}
