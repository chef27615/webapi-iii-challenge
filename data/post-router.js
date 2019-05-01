const express = require('express');

const Posts = require('./helpers/postDb');

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
    try{
        const posts = await Posts.get();
        res.status(200).json(posts) 
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "The posts information could not be retrieved"})
    } 
})

postRouter.get('/:id', async (req, res) => {
    try{
        const post = await Posts.getById(req.params.id);
        post ? res.status(200).json(post) : res.status(404).json({message: "nope, there is no post with this ID"})
    }catch(err){res.status(500).json({errorMessage: err })}
})

postRouter.post('/', async (req, res) => {
    try{
        const newPost = await Posts.insert(req.body)
        const {text, user_id} = req.body;
        text&&user_id ? res.status(200).json(newPost) : res.status(400).json({ message: "Arn't you gonna write something?"})
    }catch(err){res.status(500).json({errorMessage: err })}
})

postRouter.delete('/:id', async (req, res) => {
    try{
        const id = await Posts.remove(req.params.id)
        id > 0 ? res.status(200).json({ message: "post deleted" }) : res.status(404).json({message: "Are you trying to delete something that does not exist? "}) 
    }catch(err){res.status(500).json({errorMessage: err })}
})

postRouter.put('/:id', async (req, res) => {
    try{
        const post = await Posts.update(req.params.id, req.body)
        const {text, user_id} = req.body
        return text && user_id ? res.status(200).json(post)
                : res.status(400).json({ message: "try again there, pumpkin"})
    }catch(err){res.status(500).json({errorMessage: err })}
})

postRouter.use((req, res, next) => {
    res.status(404).json({ message: "Nice try, but no"})
})

module.exports = postRouter;