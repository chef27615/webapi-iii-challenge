const express = require('express');
const Users = require('./helpers/userDb');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try{
        const users = await Users.get();
        res.status(200).json(users) 
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "The posts information could not be retrieved"})
    } 
})



userRouter.use((req, res, next) => {
    res.status(404).json({ message: "Nice try, but no"})
})

module.exports = userRouter;