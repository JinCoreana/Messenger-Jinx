import { Router } from "express";

import User from "../schemas/user";
import Room from "../schemas/room";

const router = Router();

//List of chat rooms

router.get('/', async (req, res) => {
    try {
        const rooms = await Room.findAll({
            include: User
        })
        res.json(rooms)
    } catch (e) { }
})

//chatroom detail

router.get('/:roomId', async (req, res) => {
    try {
        const room = await Room.findOne({
            where: {
                id: Number(req.params.roomId)
            },
            include: User
        })
        res.json(room)
    } catch (e) { }
})

//create chatroom
router.post('/', async (req, res) => {
    try {
        const room = await Room.create({
            opponentId: req.body.opponentId
        });
        res.json(room)
    }
    catch (e) { }
})

export default router;

