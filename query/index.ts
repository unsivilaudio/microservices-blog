import express from 'express';
import axios from 'axios';

import type { Posts } from './types/post';
import type { EventsPostBody, EventsPostRequest } from './types/events';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

const posts: Posts = {};

function handleEvent({ type, data }: EventsPostBody) {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        const post = posts[postId] || {
            id: postId,
            title: 'null',
            comments: [],
        };
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, postId, status, content } = data;

        const post = posts[postId];
        if (!post) return;
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });

        if (comment) {
            comment.status = status;
            comment.content = content;
        }
    }
}

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/events', (req: EventsPostRequest, res) => {
    handleEvent(req.body);

    res.json({});
});

app.listen(4002, async () => {
    console.log('[QUERY] Listening on port 4002');

    try {
        const res = await axios.get<EventsPostBody[]>(
            'http://host.docker.internal:4005/events'
        );

        for (const event of res.data) {
            console.log('Processing event:', event.type);

            handleEvent(event);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
