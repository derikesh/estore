import express , {Application} from 'express';
import connectMB from './config/mongodb/mongoConfig';
import router from './router/allRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import { errorHandler } from './utility/errorHandler';

import dotenv from 'dotenv';

dotenv.config();

const app:Application = express();

// to handle cookie on each request 
app.use(cookieParser());

// using express middleware for data conversion of json to js  
app.use( express.json() );

// to handle cross origin sites
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// connecting mongodb
connectMB();

// enabling the routers 
app.use( '' , router);

app.use(errorHandler);

// server listening
app.listen( 5000 , ()=>{
    console.log("server is working on port 5000");
} ) ;


