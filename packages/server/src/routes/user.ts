import { Router } from "express";
import User from "../schemas/user";
import { Op } from "sequelize";
import { v4 as uuid } from 'uuid'

const router = Router();

// list of user
router.get('/', async (res, req) => {
    try {
        const result = await User.findAndCountAll({
            where: {
                id: {
                    [Op.ne]: req.session.userId
                }
            }
        })
        req.json(result);
    } catch (e) { }
})


// sessions
router.get('/me', async (res, req) => {
    try {
        req.json({
            username: req.session.username,
            userId: req.session.useId,
            isLogged: req.session.isLogged
        })

    } catch (e) { }
})


// login
router.post('/login', async (req, res) => {
    try {
        const userId = uuid()
        const username = req.body.username

        const user = await User.create({
            id: userId,
            username

        })
        req.session.username = username;
        req.session.userId = userId;
        req.session.isLogged = true;

        req.sessions.save(() => {
            res.json({
                statusText: 'OK',
                data: user
            })
        })
    } catch (e) { }
})

//log out

router.post('/logout', async (req, res) => {
    try {
        delete req.session.user;

        req.session.save(() => {
            res.redirect('/')
        })

    } catch (e) { }
})


export default router;