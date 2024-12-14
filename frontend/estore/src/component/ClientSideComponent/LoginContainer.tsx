"use client"

import { baseUrl } from "@/src/config/baseUrl";
import InputField from "@/src/component/ClientSideComponent/form";
import { useEffect, useState } from "react";
import { usePostUserMutation } from "@/src/store/rtkQuery";
import { useRouter } from "next/navigation";
// tostify import
import { toast } from "react-toastify";



const LoginPage = () => {

  console.log("base re,",baseUrl);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [  response , setResponse ] = useState();

const router = useRouter();

  const [postUser, { isLoading, isSuccess ,isError , error}] = usePostUserMutation();

  // setting up function to store the token and other after login is sucessfull
  useEffect( ()=>{

    if( typeof window !== 'undefined' ){
      // localStorage.setItem('estoreToken');
      // localStorage.setItem("estoreTokenExpTime");
      // localStorage.setItem("estoreAdminName");
      // localStorage.setItem("estoreAdminRole");
    }

  },[ isSuccess ] );


  // setting up to check if user is loged in and redirecting if so
  useEffect( ()=>{

    if( typeof window !== 'undefined' ){
      localStorage.getItem( 'estoreToken' ) ? router.push('/admin/dashboard') : '';
    }

    if( isSuccess ){
      toast.success('user registered sucessfully');
      setFormData({
        email:'',name:'',password:''
      })
      router.push('/admin/dashboard')
    }

    if(isError){
      toast.error(`Error occurred: ${error}`);
    }

  } ,[ isSuccess ]) 

  // handling form submit data mx 
  const handleSubmit = async (e:React.FormEvent) => {

          e.preventDefault();

          try{
           const respoinse = await postUser(formData).unwrap();
           setResponse(respoinse);
          }catch( err:any ){
            console.log("error payload message",err);
            toast.error('something went wrong error:',err.message)
          }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  console.log( "this is respoinse from the server",response );


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register User</h2>

        <form onSubmit={handleSubmit} >
          <InputField
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Full Name"
          />
          <InputField
            type="email"
            name="email"
            value={formData.email}
            label="Email Address"
            onChange={handleChange}
            id="emails"
          />
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            id="password"
          />

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            Register 
          </button>
        </form>
      </div>
    </div>
  )

}


export default LoginPage;



