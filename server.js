

const express = require('express');
const postRouter = require('./data/post-router');
const userRouter = require('./data/user-router');

const helmet = require('helmet');
const morgan = require('morgan');

const server = express();



server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send(`<p>Root server reached</p>`)
})



module.exports = server;