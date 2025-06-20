import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {Auth, LoginUserAttrs, RegisterUserAttrs, UserHeadersAttrs} from '../models/Auth';
import {requireAuth} from "../auth.middleware";

const router = express.Router();

router.post('/api/auth/login', async (req, res) => {
    const {email, password, type} = req.body as LoginUserAttrs;
    try {
        const user = await Auth.findOne({email, type: type ?? "attendee"});
        if (!user) {
            res.status(401).json({message: 'Authentication Failed'});
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({message: 'Authentication Failed'});
            return;
        }
        const jwtToken = jwt.sign(
            {email: user.email, userId: user._id, type: user.type}, process.env.JWT_SECRET!,
            {expiresIn: '1h'}
        );
        res.status(200).json({accessToken: jwtToken, userId: user._id});
    } catch (err: any) {
        res.status(500).json({message: err.message, success: false});
    }
});

router.post('/api/auth/register', async (req, res) => {
    const {email, password, name, type} = req.body as RegisterUserAttrs;
    try {
        const userExists = await Auth.exists({email, name, type});
        if (userExists) {
            res.status(400).json({message: 'User already exists'});
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const authUser = await Auth.create({email, password: hashedPassword, name, type});
        const jwtToken = jwt.sign(
            {email: authUser.email, userId: authUser._id, type: authUser.type}, process.env.JWT_SECRET!,
            {expiresIn: '1h'}
        );
        res.status(201).json({accessToken: jwtToken, userId: authUser._id});
    } catch (err: any) {
        res.status(500).json({message: 'Failed to register', error: err.message});
    }
});

router.get('/api/auth/profile', requireAuth, async (req, res) => {
    const user = (req as any).user as UserHeadersAttrs;
    const data = await Auth.findOne({email: user.email, _id: user.userId, type: user.type});
    if (!data) {
        res.status(401).json({message: 'Failed to get profile'});
        return;
    }
    res.status(200).json({name: data.name, ...user});
});

export {router as authRouter};