import express from 'express';
import dotenv from 'dotenv';
import process from 'process';
dotenv.config({path:'./.env'});
import user from './routes/userServer';
import problemSet from './routes/problemSetServer';
import submissions from './routes/submissionsServer';
import { connectToDB } from '../dbms/db';
import path from 'path';
import cors from 'cors';
const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));
  
const port = process.env.PORT;
connectToDB();

app.use('/users', user);
app.use('/problemset',problemSet);
app.use('/submissions',submissions);

app.use(express.static(path.join(__dirname, '../../public')));
app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.listen(port,()=>{
    console.log('app is listening at ', port);
});
