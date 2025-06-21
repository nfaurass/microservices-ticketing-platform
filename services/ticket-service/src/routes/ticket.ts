import express from 'express';
import {PurchasedTicket, Ticket} from '../models/Ticket';
import {publishTicketPurchased} from "../events/publisher/TicketPurchasedPublisher";
import mongoose from "mongoose";

const router = express.Router();

router.post('/api/tickets/purchase/:eventId', async (req, res) => {
    const {eventId} = req.params as { eventId: string };
    const {ticketType, quantity} = req.body;
    if (eventId) {
        const event = await Ticket.findOne({
            eventId,
            ticketTypes: {
                $elemMatch: {
                    _id: ticketType,
                    available: {$gte: quantity}
                }
            }
        });
        if (!event) {
            res.status(401).json({message: 'Invalid event / tickets'});
            return;
        }
        event.ticketTypes.map(t => {
            if (t._id == ticketType) t.available = t.available - quantity;
        });
        const result = await event.save();
        if (result) {
            for (let i = 0; i < quantity; i++) {
                await PurchasedTicket.create({
                    eventId: new mongoose.Types.ObjectId(eventId),
                    ticketType: new mongoose.Types.ObjectId(ticketType.toString()),
                    userId: new mongoose.Types.ObjectId("685588d619e74dae38321654"),
                    price: event.ticketTypes.filter(t => t._id == ticketType)[0].price * quantity,
                    qrCode: eventId.substring(0, 6) + ticketType.substring(0, 6) + Math.random().toString().replace(".", "").substring(0, 16),
                });
            }
            await publishTicketPurchased({eventId, ticketType, quantity});
        }
    }
    res.status(201).send({message: `successfully purchased: ${eventId} - ${ticketType} - ${quantity}`});
});

router.get('/api/tickets/get', async (req, res) => {
    const userId = "685588d619e74dae38321654";
    const tickets = await PurchasedTicket.find({userId}).populate('eventId');
    res.status(200).send(tickets);
});


export {router as ticketRouter};