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

export interface TicketPurchasedAttr {
    eventId: string;
    ticketType: string,
    quantity: string;
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

const purchasedTicketSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true},
        eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
        ticketType: {type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true},
        price: {type: Number, required: true},
        qrCode: {type: String, required: true, unique: true},
        status: {
            type: String,
            enum: ['active', 'scanned', 'cancelled'],
            default: 'active',
            required: true,
        },
        checkInTime: {type: Date, default: null},
    },
    {timestamps: true}
);

export const PurchasedTicket = mongoose.model('PurchasedTicket', purchasedTicketSchema);
export const Ticket = mongoose.model('Ticket', ticketSchema);