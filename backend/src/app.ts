import express , {Application} from 'express';
import connectMB from './config/mongodb/mongoConfig';
import router from './router/allRoutes';
import cors from 'cors';


const app:Application = express();

// using express middleware for data conversion of json to js  
app.use( express.json() );

app.use(cors());

// connecting mongodb
connectMB();

// enabling the routers 
app.use( '' , router);

// server listening
<<<<<<< HEAD
app.listen( 5000 , ()=>{
    console.log("server is working on port 5000");
=======
app.listen( 3001 , ()=>{
    console.log("server is working on port 3001");
>>>>>>> 26f75aecfa254ecbc09f561a65f45858b1f6790e
} ) ;

