import { Comment } from '@/types/comment';

type Post = {
    id: string;
    title: string;
    comments: Comment[];
};

export type Posts = {
    [key: string]: Post;
};
