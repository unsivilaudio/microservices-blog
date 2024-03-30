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
};

const commentsByPostId: { [key: string]: Comment[] } = {};

app.get('/posts/:id/comments', (req, res) => {
    res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://host.docker.internal:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
        },
    });

    res.status(201).json(comments);
});

app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);

    res.json({});
});

app.listen(4001, () => {
    console.log('[COMMENTS] Listening on port 4001');
});
