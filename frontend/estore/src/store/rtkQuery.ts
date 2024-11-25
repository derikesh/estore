import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config/baseUrl";


const baseUrlSetup = fetchBaseQuery({
    baseUrl:baseUrl,
    prepareHeaders: ( header:any )=>{
        let token = '';
        if( typeof window !== 'undefined' ){
            token = localStorage.getItem( 'headerToken' ) || "";
        }

        if(token){
            header.set('authorization',`Bearer : ${token}`);
        }

        return header;
    }
})

export const api = createApi({
    reducerPath:'api',  
    baseQuery:baseUrlSetup,
    tagTypes:['postUser'],
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

    //    just a random query string 
       someReadUrl: builder.query({
        query: ( query )=>({
            method:'get',
            url:'/users'
        })
       })

    })
});


export const { useSomeReadUrlQuery , usePostUserMutation } = api;