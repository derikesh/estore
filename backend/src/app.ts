import express , {Application} from 'express';
import connectMB from './config/mongodb/mongoConfig';
import router from './router/allRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import { errorHandler } from './utility/errorHandler';

import dotenv from 'dotenv';

dotenv.config();

export const productionSite = process.env.PRODUCTION_SITE;

const app:Application = express();

const port = process.env.PORT;

// to handle cookie on each request 
app.use(cookieParser());

// using express middleware for data conversion of json to js  
app.use(express.json());

// to handle cross origin sites
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",  // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeaders: ['set-cookie'],
}));
// connecting mongodb
connectMB();

// app optoins 
// enabling the routers 
app.use('', router);

app.use(errorHandler);

// server listening
app.listen(port, () => {
    console.log(`server is working on port ${port}`);
});


