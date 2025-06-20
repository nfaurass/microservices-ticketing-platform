import express from 'express';
import {Event, EventAttrs} from '../models/Event';
import {publishEventCreated} from '../events/publisher/EventCreatedPublisher';

const router = express.Router();

router.post('/api/events/create', async (req, res) => {
    const {title, description, imageUrl, ticketTypes, venue, date, id} = req.body as EventAttrs;

    const event = await Event.create({title, description, imageUrl, venue, date});
    await publishEventCreated({title, description, imageUrl, ticketTypes, venue, date, id: (event._id).toString()});

    res.status(201).send(event);
});

export {router as eventRouter};