import express from 'express';
import {Ticket} from '../models/Ticket';
import {publishTicketPurchased} from "../events/publisher/TicketPurchasedPublisher";

const router = express.Router();

router.post('/api/tickets/purchase/:eventId', async (req, res) => {
    const {eventId} = req.params as { eventId: string };
    const {ticketType, quantity} = req.body;
    if (eventId) {
        const event = await Ticket.findOne({eventId});
        if (!event) {
            res.status(401).json({message: 'Invalid event id'});
            return;
        }
        event.ticketTypes.map(t => {
            if (t._id == ticketType) t.available = t.available - quantity;
        });
        const result = await event.save();
        if (result) await publishTicketPurchased({eventId, ticketType, quantity});
    }
    res.status(201).send({message: `successfully purchased: ${eventId} - ${ticketType} - ${quantity}`});
});

export {router as ticketRouter};