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

const ticketSchema = new mongoose.Schema(
    {
        eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
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

eventSchema.virtual('ticketTypes', {
    ref: 'Ticket',
    localField: '_id',
    foreignField: 'eventId'
});

eventSchema.set('toObject', {virtuals: true});
eventSchema.set('toJSON', {virtuals: true});

export const Event = mongoose.model('Event', eventSchema);