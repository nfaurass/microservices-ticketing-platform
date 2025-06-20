import {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';
import {UserHeadersAttrs} from "./models/Auth";

export const requireAuth: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({message: 'Authorization token missing'});
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        (req as any).user = jwt.verify(token, process.env.JWT_SECRET!) as UserHeadersAttrs;
        next();
    } catch (err) {
        res.status(401).json({message: 'Invalid or expired token'});
    }
};