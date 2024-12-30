import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config/baseUrl";



// this is not opimal and will not be used as backend does not require anything from header for authoization 
const baseUrlSetup = fetchBaseQuery( {
    baseUrl:baseUrl,
    credentials:'include',
    prepareHeaders:( header:Headers )=>{

        const cookies = document.cookie
        const token = cookies.split("; ").find( (item)=>item.startsWith('e_accessToken='))?.split("=")[1];

        if(token){
           header.set('Authorization',`Bearer ${token}`)
        }

        return header;

    },
} )

export const api = createApi({
    reducerPath:'api',  
    baseQuery:baseUrlSetup,
    tagTypes:['postUser', 'login','refreshToken','addProduct','readProduct'],
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
        query:()=>({
            url:'/refreshToken',
            method:'POST',
            credentials:"include"
        }),
        invalidatesTags:['refreshToken']
    } ),
    
    addProduct:builder.mutation({
        query:( body )=>({
            method:'POST',
            url:'/product/add',
            body
        }),
        invalidatesTags:['addProduct']
    }) , 

    readallProduct : builder.query({
        query : (query)=>({
            method:'GET',
            url:'/product'
        }),
        providesTags:['readProduct']
    })

    })
});


export const {  usePostUserMutation , useLoginMutation , useRefreshTokenMutation , useAddProductMutation , useReadallProductQuery} = api;


