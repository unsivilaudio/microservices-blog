import express from 'express';
import { randomBytes } from 'crypto';
import axios from 'axios';

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

type Comment = {
    id: string;
    content: string;
    status: 'pending' | 'approved';
};

const commentsByPostId: { [key: string]: Comment[] } = {};

app.get('/posts/:id/comments', (req, res) => {
    res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://host.docker.internal:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending',
        },
    });

    res.status(201).json(comments);
});

app.post('/events', async (req, res) => {
    console.log('Event Received:', req.body.type);

    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        });

        if (comment) {
            comment.status = status;

            await axios.post('http://host.docker.internal:4005', {
                type: 'CommentUpdated',
                data: {
                    id,
                    status,
                    postId,
                    content,
                },
            });
        }
    }

    res.json({});
});

app.listen(4001, () => {
    console.log('[COMMENTS] Listening on port 4001');
});
