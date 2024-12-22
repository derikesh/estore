'use client'

import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLoginMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

export default function LoginContainer() {

    const router = useRouter();

    const initialValues = {
        email: '',
        password: ''
    };

    const [postLogin, { isSuccess,  data,isError , error:loginError }] = useLoginMutation();

    const handleSubmit = async (values: typeof initialValues) => {
        try {
           const response =await  postLogin(values).unwrap();
           const token =  response?.data?.token;
           localStorage.setItem( 'estoreToken' , token );
        } catch (err:any) {
            console.log( 'error catch', err );
            toast.error(`error: ${err?.data?.message}`);
        }   
    };


    // check before hand if token exists
    useEffect( ()=>{

        if( typeof window !== 'undefined' && isSuccess ){
            localStorage.setItem("estoretoken", data?.tokens);
        }

    } ,[data,isSuccess])

    // for sucess message
    useEffect( ()=>{

        if( isSuccess ){
            toast.success('user logged in sucessfully');
            router.push('/admin/dashboard');
        }

        if(isError){
            toast.error(`error from hook: ${JSON.stringify(loginError)}`);
        }

    },[isSuccess,isError,loginError] );


    // for error

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700">Email</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700">Password</label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
