import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config/baseUrl";



// this is not opimal and will not be used as backend does not require anything from header for authoization 
const baseUrlSetup = fetchBaseQuery( {
    baseUrl:baseUrl,
    credentials:'include',
    prepareHeaders:( header:Headers )=>{

        const cookies = document.cookie
        const token = cookies.split("; ").find( (item)=>item.startsWith('accessToken='))?.split("=")[1];

        if(token){
           header.set('Authorization',`Bearer ${token}`)
        }

        return header;

    },
} )

export const api = createApi({
    reducerPath:'api',  
    baseQuery:baseUrlSetup,
    tagTypes:['postUser', 'login','refreshToken'],
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
       }),

    //refreshtoke
    refreshToken:builder.mutation( {
        query:( body )=>({
            method:'post',
            url:'/refreshToken',
            body
        }),
        invalidatesTags:['refreshToken']
    } )   

    })
});


export const {  usePostUserMutation , useLoginMutation , useRefreshTokenMutation} = api;


