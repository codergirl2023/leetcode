import { authenticateJwt } from './../../middleware/auth';
import express from "express";
import jwt from 'jsonwebtoken';
const SECRET = process.env.TOKEN_KEY;
import { createRecord, searchRecord } from '../../dbms/schema/UserSchema';
import { IUser } from '../types';
const router = express.Router();


router.post('/signup', async (req, res) => {
    if (!SECRET) {
        return res.status(500).json({ "message": "Secret key is missing" });
    }
    try {
        const email = req.body.email;
        const password = req.body.password;
        const fullName = req.body.fullName;

        const user = await searchRecord({ email });
        if (user.length) {
            return res.status(403).send({ 'message': 'Username already exists in our database, please try some other username' });
        }

        const token = jwt.sign(
            { email, password },
            SECRET,
            { expiresIn: "1h" }
        );
        const userRecord: IUser = { fullName, email, password };
        createRecord(userRecord);
        res.status(200).send({ 'message': 'User created successfully', 'jwtToken': token });
    } catch (error) {
        console.error('Error creating the user:', error);
        return res.status(500).send('Error creating the user. Please try again later.');
    }
});

router.post('/login', async (req, res) => {
    if (!SECRET) {
        return res.status(500).json({ "message": "Secret key is missing" });
    }
    const email = req.headers.email;
    const password = req.headers.password;
    const user = await searchRecord({ email, password });
    if (!user.length) {
        return res.status(403).send({ 'msg': 'Email or Password is incorrect. Please try with correct email/password' });
    }
    const token = jwt.sign(
        { email, password },
        SECRET,
        {
            expiresIn: "1h",
        }
    );

    return res.status(200).send({ 'message': 'User logged in successfully', 'jwtToken': token });
});

router.get('/all', authenticateJwt, async (req, res) => {
    const allUsers = await searchRecord({});
    return res.status(200).send(allUsers);
});

router.get('/me', authenticateJwt, (req, res) => {
    if (req.headers['userId'] !== null){
         res.status(200).send({ email: req.headers['userId'] });
    }
});

export default router;
