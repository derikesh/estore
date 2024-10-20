import mongoose from "mongoose";
import { Schema } from "mongoose";

// users interface 
interface USER_INTERFACE {
    email:string,
    password:string,
    role:string 
}


// data schema 
const USER_SCHEMA = new mongoose.Schema({
    email : { type:String , required:true },
    password:{ type:String , required:true },
    role:{ type:String , default :'user' }
})


export default mongoose.model( 'USERS' , USER_SCHEMA );