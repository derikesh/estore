import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config/baseUrl";


const baseUrlSetup = fetchBaseQuery({
    baseUrl:baseUrl,
    prepareHeaders: ( header:Headers )=>{
        let token = '';
        if( typeof window !== 'undefined' ){
            token = localStorage.getItem( 'estoreToken' ) || "";
        }

        if(token){
            header.set('Authorization',`Bearer ${token}`);
        }

        return header;
    }
});

export const api = createApi({
    reducerPath:'api',  
    baseQuery:baseUrlSetup,
    tagTypes:['postUser', 'login'],
    endpoints:( builder )=>({

        // posting user
       postUser: builder.mutation({
            query: (body)=>({
                method:'post',
                url:'/users/newUser',
                body
            }),
            invalidatesTags:['postUser']
       }),

       //login
       login: builder.mutation({
        query:( body )=>({
            method:'post',
            url:'/login',
            body
        }),
        invalidatesTags:['login']
       })

       
   

    })
});


export const {  usePostUserMutation , useLoginMutation} = api;


