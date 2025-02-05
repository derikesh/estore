import mongoose from "mongoose";
import dotevn from 'dotenv';


dotevn.config();

const mongoUrl = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@estorecluster.jrm39.mongodb.net/?retryWrites=true&w=majority&appName=estoreCluster`

const connectMB = async ()=>{
    try {
        const db = await mongoose.connect(mongoUrl)
        if(db){
            console.log("Mongodb connected successfully");
        }
    }catch(err){
        console.error("some error occured while trying to connect with mongodb in configutaion",err);
    }
}

// mongoose.set('strictPopulate', false);


export default connectMB;