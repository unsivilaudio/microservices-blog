import { Comment } from './comment';

export type Post = {
    id: string;
    title: string;
    comments: Comment[];
};

export type Posts = {
    [key: string]: Post;
};
