import { Router } from "express";

import Chat from "../schemas/chat"
import User from "../schemas/user";
import Room from "../schemas/room";

const router = Router();

// List of chats

router.get(':/roomId', async (req, res) => {
    try {
        const chat = await Chat.findAll({
            where: {
                roomId: req.params.roomId
            },
            include: [User, Room]
        });
        res.json(chat);
    } catch (e) { }
})

// Send Chats

router.post(':/roomId', async (req, res) => {
    try {
        const chat = await Chat.create({
            senderId: req.session.userId,
            content: req.body.content,
            roomId: req.params.roomId
        });
        res.json({ message: 'OK' })
    } catch (e) { }
})




export default router;