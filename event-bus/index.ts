import express from 'express';
import axios, { AxiosError } from 'axios';
import type { Event } from './types/event';

const app = express();
app.use(express.json());

const events: Event[] = [];

app.post('/events', async (req, res) => {
    const event = req.body;
    event.createdAt = Date.now();
    events.push(event);

    const eventRequests = [
        axios.post('http://host.docker.internal:4000/events', event),
        axios.post('http://host.docker.internal:4001/events', event),
        axios.post('http://host.docker.internal:4002/events', event),
        axios.post('http://host.docker.internal:4003/events', event),
    ];

    await Promise.allSettled(eventRequests)
        .then(results => {
            for (const result of results) {
                if (result.status === 'rejected') {
                    if (result.reason instanceof AxiosError) {
                        console.log(
                            '[EVENTS] rejected:',
                            result.reason.message
                        );
                    }
                }
            }
        })
        .catch(err => {});

    res.status(201).json({ status: 'Ok' });
});

app.get('/events', (req, res) => {
    // SORTING EVENTS BY INCEPTION TIME
    events.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    res.json(events);
});

app.listen(4005, () => {
    console.log('[EVENTS] Listening on port 4005');
});
