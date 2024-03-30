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

type Post = {
    id: string;
    title: string;
};

const posts: { [key: string]: Post } = {};

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title,
    };

    await axios.post('http://host.docker.internal:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title,
        },
    });

    res.status(201).json(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);

    res.json({});
});

app.listen(4000, () => {
    console.log('[POSTS] Listening on 4000');
});
