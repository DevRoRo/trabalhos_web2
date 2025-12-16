import { configDotenv } from 'dotenv';
configDotenv();

console.log({ 
    env: process.env
});

import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false}));

app.use(express.json());

import userRouter from './routers/users-routes.js'
app.use('/users', userRouter);

app.get('/', (req, res) => {
    return res.status(200).send("WEBII");
});

app.listen(3000, () => {
    console.log("Running on PORT 3000")
});