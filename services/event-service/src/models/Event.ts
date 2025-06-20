import mongoose from 'mongoose';

interface TicketType {
    id: string;
    name: string;
    price: number;
    available: number;
    description?: string;
}

export interface EventAttrs {
    id: string;
    title: string;
    date: string;
    venue: string;
    description: string;
    imageUrl: string;
    ticketTypes: TicketType[];
}

const eventSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        date: {type: String, required: true},
        venue: {type: String, required: true},
        description: {type: String, required: true},
        imageUrl: {type: String, required: true},
    },
    {timestamps: true}
);

export const Event = mongoose.model('Event', eventSchema);