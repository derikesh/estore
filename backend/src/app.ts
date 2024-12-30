import express , {Application} from 'express';
import connectMB from './config/mongodb/mongoConfig';
import router from './router/allRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv';

dotenv.config();

const app:Application = express();

// to handle cookie on each request 
app.use(cookieParser())

// to handle cross origin sites
app.use(cors({
    origin:process.env.FRONTEND_URL, // Specify your frontend URL here
    credentials: true,  // Allow credentials (cookies) to be sent with requests
}));



// using express middleware for data conversion of json to js  
app.use( express.json() );

// connecting mongodb
connectMB();

// enabling the routers 
app.use( '' , router);

// server listening
app.listen( 5000 , ()=>{
    console.log("server is working on port 5000");
} ) ;

