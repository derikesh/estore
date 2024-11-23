import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateApi,  } from "@reduxjs/toolkit/query";
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

const api = createApi({
    reducerPath:'api',  
    baseQuery:baseUrlSetup,
    tagTypes:['postUser'],
    endpoints:( builder )=>({

        // posting user
       someendpoint: builder.mutation({
            query: (body)=>({
                method:'post',
                url:'/user/new',
                body
            }),
            invalidatesTags:['postUser']
       }),

       someReadUrl: builder.query({
        query: ( query )=>({
            method:'get',
            url:'/users'
        })
       })

    })
})