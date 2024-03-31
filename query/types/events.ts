import type { Request } from 'express';
import type { Comment } from './comment';
import type { Post } from './post';

type PostCreated = {
    type: 'PostCreated';
    data: Omit<Post, 'comments'>;
};

type CommentCreated = {
    type: 'CommentCreated';
    data: Comment & {
        postId: string;
    };
};

type CommentUpdated = {
    type: 'CommentUpdated';
    data: Comment & {
        postId: string;
    };
};

type EventsPostBody = PostCreated | CommentCreated | CommentUpdated;

export interface EventsPostRequest extends Request {
    body: EventsPostBody;
}
