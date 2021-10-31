import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRouter } from './controller/user.controller';
import 'dotenv/config';

(async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
    }));
    app.use(cookieParser());

    app.use('/users', userRouter);

    try {
        await createConnection();
        console.log('connected to postgres');
    } catch (error) {
        console.error(error);
    }

    app.listen(4000, () => console.log('server listening on port 4000'));
})();
