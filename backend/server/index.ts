import express from 'express';
import dotenv from 'dotenv';
import process from 'process';
import cors from 'cors';
dotenv.config({path:'./.env'});
import user from './routes/userServer';
import problemSet from './routes/problemSetServer';
import submissions from './routes/submissionsServer';

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use('/users', user);
app.use('/problemset',problemSet);
app.use('/submissions',submissions);

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.listen(port,()=>{
    console.log('app is listening at ', port);
});
