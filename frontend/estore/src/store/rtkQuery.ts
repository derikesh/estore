import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config/baseUrl";

// This setup includes credentials for all requests
const baseUrlSetup = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include', // Include credentials for all requests
    prepareHeaders: (header: Headers) => {
        const cookies = document.cookie;
        const token = cookies.split("; ").find((item) => item.startsWith('e_accessToken='))?.split("=")[1];

        if (token) {
            header.set('Authorization', `Bearer ${token}`);
        }

        return header;
    },
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseUrlSetup,
    tagTypes: ['postUser', 'login', 'refreshToken', 'addProduct','deleteProduct', 'readProduct', 'uploadImage', 'deleteImage', 'readCategories', 'deleteCategory','addCategory', 'updateCategory','readSingleCategories'],
    endpoints: (builder) => ({
        // Posting user
        postUser: builder.mutation({
            query: (body) => ({
                method: 'post',
                url: '/users/newUser',
                body,
            }),
            invalidatesTags: ['postUser'],
        }),

        // Login
        login: builder.mutation({
            query: (body) => ({
                method: 'post',
                url: '/login',
                body,
            }),
            invalidatesTags: ['login'],
        }),

        // Refresh token
        refreshToken: builder.mutation({
            query: () => ({
                url: '/refreshToken',
                method: 'POST',
                credentials: "include",
            }),
            invalidatesTags: ['refreshToken'],
        }),

        addProduct: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/product/add',
                body,
            }),
            invalidatesTags: ['addProduct'],
        }),


        deleteProduct:builder.mutation({
            query:(id)=>({
                method:'DELETE',
                url:'/product/delete/:id',                
            }),
            invalidatesTags:['deleteProduct']
        }),

        readallProduct: builder.query({
            query: () => ({
                method: 'GET',
                url: '/product',
            }),
            providesTags: ['readProduct'],
        }),

        updateProduct: builder.query({
            query: ({id,updatedBody}) => ({
                method: 'GET',
                url: '/product',
                body:{
                    id:id,
                    updatedBody
                }
            }),
            providesTags: ['readProduct'],
        }),

        

        uploadImage: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/uploadImage',
                body,
            }),
            invalidatesTags: ['uploadImage'],
        }),

        deleteIMage: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/deleteImage',
                body,
            }),
            invalidatesTags: ['deleteImage'],
        }),

        addCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/category/add',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ['addCategory'],
        }),

        readCategories: builder.query({
            query: () => ({
                method: 'GET',
                url: '/category',
            }),
            providesTags: ['readCategories'],
        }),

        readSingleCategories: builder.query({
            query: (id) => ({
                method: 'GET',
                url: `/category/${id}`,
            }),
            providesTags: ['readSingleCategories'],
        }),

        updateCategory: builder.mutation({
            query: ({ id, updatedCategory }) => ({
                url: `/category/${id}`,
                method: 'PATCH',
                body: updatedCategory,
            }),
            invalidatesTags: ['updateCategory'],
        }),

        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
              url: `/category/delete/${id}`,
              method: 'DELETE',
            }),
            invalidatesTags: ['deleteCategory'],
          }),
    }),
});

export const {
    usePostUserMutation,
    useLoginMutation,
    useRefreshTokenMutation,
    useDeleteIMageMutation,
    useAddProductMutation,
    useDeleteProductMutation,
    useReadallProductQuery,
    useUploadImageMutation,
    useReadCategoriesQuery,
    useUpdateCategoryMutation,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useReadSingleCategoriesQuery
} = api;