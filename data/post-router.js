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


module.exports = postRouter;