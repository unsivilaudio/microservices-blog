import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://host.docker.internal:4000/events', event);
    axios.post('http://host.docker.internal:4001/events', event);
    axios.post('http://host.docker.internal:4002/events', event);

    res.status(201).json({ status: 'Ok' });
});

app.listen(4005, () => {
    console.log('[EVENTS] Listening on port 4005');
});
