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

router.get('/api/events/get', async (req, res) => {
    // Simplified
    const events = await Event.find().populate('ticketTypes');
    res.status(200).send(events);
});

router.get('/api/events/get/:id', async (req, res) => {
    const {id} = req.params;
    if (!id) {
        res.status(401).json({message: 'Invalid id'});
        return;
    }
    try {
        // Simplified
        const events = await Event.findOne({_id: id}).populate('ticketTypes');
        res.status(200).send(events);
    } catch {
        res.status(401).json({message: 'Invalid id'});
    }
})

export {router as eventRouter};