"use client"

import { baseUrl } from "@/src/config/baseUrl";
import InputField from "@/src/component/form";
import { FormEvent, useState } from "react";

// tostify import
import { toast } from "react-toastify";

// axios call
import axiosApi from "@/src/config/axiosInstance";

const LoginPage = ()=>{


  console.log("base url",baseUrl);

  const [ formData , setFormData ] = useState({
    name:"",
    email:"",
    password:""
  });

  // handling form submit data 
  const handleSubmit = async ({data}:any)=>{
    
        try{  
            if( data ){
            let res = axiosApi.post( '/users/newUser' , data ); 
            toast.success("user added sucessfully");
            console.log( res);
             }
        }catch(err:any){
          console.log( err.message );
        }

  }

   const handleChange = ( e:React.ChangeEvent<HTMLInputElement> )=>{
  
    const { name , value } = e.target;

    setFormData( ( prevData )=>({
        ...prevData,
        [name] : value
    }) )
    
  }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register User</h2>

        <form onSubmit={ ()=>handleSubmit( formData )  } >
          <InputField
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={ handleChange }
            label="Full Name"
          />
          <InputField
            type="email"
            name="email"
            value={formData.email}
            label="Email Address"
            onChange={ handleChange }
            id="name"
          />
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={ handleChange }
            label="Password"
            id="ks"
          />

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    )

}


export default LoginPage;



