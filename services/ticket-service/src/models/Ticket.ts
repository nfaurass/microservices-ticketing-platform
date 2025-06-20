import mongoose from 'mongoose';

export interface EventType {
    id: string;
    title: string;
    date: string;
    venue: string;
    description: string;
    imageUrl: string;
    ticketTypes: Omit<TicketAttrs, 'eventId'>[];
}

export interface TicketAttrs {
    id: string;
    eventId: string,
    name: string;
    price: number;
    available: number;
    description?: string;
}

const ticketSchema = new mongoose.Schema(
    {
        eventId: {type: String, required: true},
        ticketTypes: [
            {
                name: {type: String, required: true},
                price: {type: Number, required: true},
                available: {type: Number, required: true},
                description: {type: String}
            }
        ]
    },
    {timestamps: true}
);


export const Ticket = mongoose.model('Ticket', ticketSchema);