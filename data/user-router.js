const express = require('express');
const Users = require('./helpers/userDb');
const Posts = require('./helpers/postDb');
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

userRouter.get('/:id', async (req, res) => {
    try{
        const user = await Users.getById(req.params.id);
        user ? res.status(200).json({user}) : res.status(404).json({ message: "no one here by that ID"})
    }catch(err){res.status(500).json({errorMessage: err })}
})

userRouter.post('/', upperName, async (req, res) => {
    try{
        const newUser = await Users.insert(req.body)
        const { id, name } =req.body;
        id && name ? res.status(200).json(newUser) : res.status(304).json({message: " nope, just no"})
    }catch(err){res.status(500).json({errorMessage: err })}
})

userRouter.delete('/:id', async (req, res) => {
    try{
        const userId = await Users.remove(req.params.id)
        userId ? res.status(200).json({ message: "user has been terminated "}) : res.status(400).json({ message: " everyone deserrve a second chance, even when they do not exist"})
    }catch(err){res.status(500).json({errorMessage: err })}
})

userRouter.put('/:id', upperName , async (req, res) => {
    try{
        const updatedUser = await Users.update(req.params.id, req.body);
        const { id, name } = req.body;
        name && id ? res.status(200).json(updatedUser) : res.status(400).json({ message: "not really, keep working"})
    }catch(err){res.status(500).json({errorMessage: err })}
})

userRouter.get('/:id/posts', async (req, res) => {
    try{
        const posts = await Users.getUserPosts(req.params.id);
        posts ? res.status(200).json(posts) : res.status(404).json({ message: "no such thing"})
    }catch(err){res.status(500).json({errorMessage: err })}
})



userRouter.use((req, res, next) => {
    res.status(404).json({ message: "Nice try, but no"})
})

function upperName(req, res, next){
        const newName = req.body.name.toUpperCase();
        req.body.name = newName;
        next()
    }

module.exports = userRouter;