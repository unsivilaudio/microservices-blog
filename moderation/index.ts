import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange')
            ? 'rejected'
            : 'approved';

        await axios.post('http://host.docker.internal:4005/events', {
            type: 'CommentUpdated',
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status,
            },
        });
    }

    res.json({});
});

app.listen(4003, () => {
    console.log('[MODERATION] Listening on port 4003');
});
