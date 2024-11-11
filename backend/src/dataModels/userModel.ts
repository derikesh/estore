import mongoose from "mongoose";
import { Schema } from "mongoose";

// users interface 
interface USER_INTERFACE {
    name:string,
    email:string,
    password:string,
    role:string 
}


// data schema 
const USER_SCHEMA = new mongoose.Schema({
    name:{ type:String , required:true },
    email : { type:String , required:true , unique:true},
    password:{ type:String , required:true },
    role:{ type:String , default :'user' }
})


export default mongoose.model<USER_INTERFACE>( 'USERS' , USER_SCHEMA );