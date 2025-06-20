import express from 'express';
import {Ticket} from '../models/Ticket';

const router = express.Router();

router.post('/api/tickets/purchase', async (req, res) => {
    res.status(201).send({});
});

export {router as ticketRouter};